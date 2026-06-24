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
      <SectionCard title="Requirements (from the drill spec)">
        <ol>
          <li><strong>Button to open modal.</strong></li>
          <li><strong>Modal with a semi-transparent overlay.</strong></li>
          <li><strong>Click the overlay → close the modal.</strong></li>
          <li><strong>Click inside the modal content → do NOT close it.</strong> This requires <InlineCode>e.stopPropagation()</InlineCode>. This is the primary evaluation point.</li>
          <li><strong>Close button inside the modal.</strong></li>
        </ol>
      </SectionCard>

      <SectionCard title="How to think about it">
        <ul>
          <li>"State is trivially <InlineCode>isOpen: boolean</InlineCode>. The entire challenge is about the close mechanics — three triggers all call <InlineCode>setIsOpen(false)</InlineCode>: Escape key, overlay click, and the Close button."</li>
          <li><strong>The key insight:</strong> The overlay's <InlineCode>onClick</InlineCode> closes the modal. The modal's own <InlineCode>onClick</InlineCode> calls <InlineCode>e.stopPropagation()</InlineCode> to prevent bubble-up. Without this, clicking anywhere inside the modal also fires the overlay's handler and closes it immediately.</li>
          <li>"I always mention React Portals unprompted — modals should render outside the app root so they're never clipped by parent <InlineCode>overflow: hidden</InlineCode> layouts."</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Names <InlineCode>e.stopPropagation()</InlineCode> on the modal <InlineCode>div</InlineCode> as the critical missing piece. "Without this, clicking inside the modal content fires the overlay handler — it closes immediately."</li>
          <li>Uses <InlineCode>ReactDOM.createPortal(modal, document.body)</InlineCode> to render the overlay directly on <InlineCode>body</InlineCode>, avoiding any parent <InlineCode>overflow: hidden</InlineCode> clipping.</li>
          <li>Guards the Escape key <InlineCode>useEffect</InlineCode> with <InlineCode>if (!isOpen) return</InlineCode>. "We don't want a global keydown listener running when nothing is open."</li>
          <li>Locks body scroll: <InlineCode>document.body.style.overflow = 'hidden'</InlineCode> when open, restored in the cleanup function.</li>
          <li>Adds ARIA: <InlineCode>role="dialog"</InlineCode>, <InlineCode>aria-modal="true"</InlineCode>, <InlineCode>aria-labelledby</InlineCode> pointing to the modal title.</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Forgetting <InlineCode>stopPropagation</InlineCode> — every click inside the modal immediately closes it because the event bubbles to the overlay.</li>
          <li>Forgetting to clean up the keydown event listener — leads to memory leaks and stale handlers.</li>
          <li>Rendering the modal inline in the component tree instead of via a portal — clips behind <InlineCode>overflow: hidden</InlineCode> ancestors.</li>
        </ul>
      </Trap>

      <SectionCard title="CSS Detail">
        <ul>
          <li><strong>Fixed overlay:</strong> Use <InlineCode>position: fixed; inset: 0</InlineCode> to cover the full viewport — cleaner than declaring <InlineCode>top/right/bottom/left</InlineCode> separately.</li>
        </ul>
      </SectionCard>
    </>
  ),
};
