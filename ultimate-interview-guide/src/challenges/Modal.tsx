import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { InlineCode } from '../components/InlineCode';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  // Effect for Escape key: guard on isOpen so the listener only exists when needed.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Body scroll lock — prevents the page from scrolling behind the modal.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const modal = (
    // Overlay click closes. Modal content click stops propagation.
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className={styles.title}>Confirm action</h2>
        <p className={styles.body}>Are you sure you want to proceed with this operation?</p>
        <div className={styles.actions}>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button className={styles.primary} onClick={() => setIsOpen(false)}>Confirm</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button className={styles.triggerButton} onClick={() => setIsOpen(true)}>Open modal</button>
      {isOpen && createPortal(modal, document.body)}
    </>
  );
}

export const ModalChallenge = {
  id: 'modal',
  title: 'Modal',
  demo: <Modal />,
  code: `import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false)

  // "Effect for Escape key: I guard on isOpen so the listener only exists when needed."
  useEffect(() => {
    if (!isOpen) return  // "This guard matters. Don't attach when nothing to close."

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // "Body scroll lock — prevents the page from scrolling behind the modal."
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const modal = (
    // "Overlay click closes. Modal content click stops propagation."
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}  // "critical — without this, clicking inside closes the modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className={styles.title}>Confirm action</h2>
        <p className={styles.body}>Are you sure you want to proceed?</p>
        <div className={styles.actions}>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button className={styles.primary} onClick={() => setIsOpen(false)}>Confirm</button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open modal</button>
      {/* "Portal renders outside the app root — avoids overflow clipping." */}
      {isOpen && createPortal(modal, document.body)}
    </>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"State shape is trivially <InlineCode>isOpen: boolean</InlineCode>. The interesting parts are the behaviors: Escape key, overlay click, and focus traps."</li>
          <li>We need to wire up three close triggers: Escape key, backdrop overlay click, and active Close/Cancel buttons. All of them invoke <InlineCode>setIsOpen(false)</InlineCode>.</li>
          <li>"I always mention React Portals unprompted — modals should render outside the app root so they're never clipped by parent layouts utilizing <InlineCode>overflow: hidden</InlineCode>."</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Uses <InlineCode>ReactDOM.createPortal(modal, document.body)</InlineCode> to render overlay layers directly onto the body root.</li>
          <li>Locks background scrolling by setting <InlineCode>document.body.style.overflow = 'hidden'</InlineCode> when open, restoring it upon cleanup.</li>
          <li>Cleans up keydown listeners: "The guard condition in the effect is important — we don't want active listeners running when the modal is closed."</li>
          <li>Uses <InlineCode>e.stopPropagation()</InlineCode> on the dialog content box to prevent backdrop click dismissals from bubble propagation.</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Forgetting to clean up keydown event listeners, leading to memory leaks and stale event loops.</li>
          <li>Omitting <InlineCode>stopPropagation</InlineCode>, causing clicks inside the dialog content to immediately close it.</li>
          <li>Rendering the modal directly inside the parent layout rather than utilizing a portal overlay.</li>
        </ul>
      </Trap>

      <SectionCard title="CSS Detail">
        <ul>
          <li><strong>Fixed positioning overlay:</strong> Use modern shorthand <InlineCode>position: fixed; inset: 0</InlineCode> to cover the entire viewport cleanly instead of declaring top, right, bottom, and left separately.</li>
        </ul>
      </SectionCard>
    </>
  ),
};
