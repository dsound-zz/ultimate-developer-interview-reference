import React from 'react';
import { SectionContainer } from '../../components/SectionContainer';
import { SectionCard } from '../../components/SectionCard';
import { Callout } from '../../components/Callout';
import { PatternCard } from '../../components/PatternCard';

export const LangGraphOrchestration: React.FC = () => {
  return (
    <SectionContainer
      id="langgraph-orchestration"
      title="LangGraph & Orchestration"
      category="AGENTIC ORCHESTRATION"
      accentColor="var(--accent)"
    >
      <SectionCard title="Why Cyclic Graphs?">
        <ul>
          <li><strong>DAGs vs. Cycles</strong>: Traditional prompt chaining libraries (like LangChain) enforce Directed Acyclic Graphs (linear pipelines). However, robust agents require cycles—loops where a model can try an action, observe the failure, reflect, and try again.</li>
          <li><strong>Graph Nodes & Edges</strong>: Nodes represent processing steps (LLM calls, tool executions, post-processing). Edges define control flow. Conditional edges route execution dynamically based on output state (e.g. routing to an editor node if tests fail).</li>
        </ul>
      </SectionCard>

      <SectionCard title="State Management & Checkpointing">
        <ul>
          <li><strong>Shared State Schema</strong>: In LangGraph, nodes write updates to a centralized, shared state object rather than passing data directly. This ensures consistency.</li>
          <li><strong>Thread Checkpointing</strong>: The execution state can be written to disk (checkpointed) after every node step. This enables:
            <ul>
              <li><strong>Time-Travel Debugging</strong>: Replaying and modifying inputs at any historical execution step.</li>
              <li><strong>Human-in-the-Loop</strong>: Pausing the graph before critical actions (e.g. shipping database migrations or charging credit cards) to await human approval, then resuming state.</li>
            </ul>
          </li>
        </ul>
        <Callout type="key-insight">
          "Orchestrating complex agents using raw loops and nested 'if' statements quickly becomes unmaintainable. Graph-based state machines formalize execution states, error boundaries, and state mutations, making them auditable in production."
        </Callout>
      </SectionCard>

      <PatternCard
        patternName="Defining a State Graph with Routing Edges"
        code={`// Mock structure simulating LangGraph State Machine configuration
interface GraphState {
  messages: string[];
  testOutput: string;
  isPassed: boolean;
}

class StateGraph {
  private state: GraphState;
  
  constructor() {
    this.state = { messages: [], testOutput: '', isPassed: false };
  }

  // 1. Define Node Steps
  async coderNode(state: GraphState): Promise<Partial<GraphState>> {
    console.log("Coder node writing implementation...");
    return { 
      messages: [...state.messages, 'function add(a,b) { return a + b; }'] 
    };
  }

  async testerNode(state: GraphState): Promise<Partial<GraphState>> {
    console.log("Tester node executing validations...");
    // Mocking a test evaluation result
    const pass = Math.random() > 0.4;
    return {
      testOutput: pass ? 'All tests passed' : 'SyntaxError: missing parenthesies',
      isPassed: pass
    };
  }

  // 2. Define Conditional Router Edge
  routeEdge(state: GraphState): 'coder' | 'end' {
    if (state.isPassed) {
      console.log("Validation successful. Routing to END.");
      return 'end';
    } else {
      console.log("Validation failed. Routing back to Coder Node.");
      return 'coder';
    }
  }

  // 3. Compile and Run the graph loop
  async runGraph(input: string) {
    this.state.messages.push(input);
    let step = 0;
    const maxSteps = 5;

    while (step < maxSteps) {
      // Execute Coder Node
      const coderUpdate = await this.coderNode(this.state);
      this.state = { ...this.state, ...coderUpdate };

      // Execute Tester Node
      const testUpdate = await this.testerNode(this.state);
      this.state = { ...this.state, ...testUpdate };

      // Evaluate Router
      const nextNode = this.routeEdge(this.state);
      if (nextNode === 'end') break;

      step++;
    }
    
    return this.state;
  }
}

const graph = new StateGraph();
await graph.runGraph("Write an addition function.");`}
        description="A lightweight TypeScript simulation of a state graph illustrating nodes, centralized state schema updates, and a cyclic router edge."
      />
    </SectionContainer>
  );
};
