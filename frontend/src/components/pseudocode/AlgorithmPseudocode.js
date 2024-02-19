import React from 'react';
import './AlgorithmPseudocode.css';
function AlgorithmPseudocode({ pseudocode }) {
    const pseudoCode = {
        "dfs": `Depth-First Search (DFS):
1. Initialize the start and end points.
2. Initialize a stack with the start point.
3. While the stack is not empty:
   a. Pop the top node from the stack.
   b. If this node is the end node, reconstruct and return the path.
   c. For each neighbor of the current node:
      i. If the neighbor is not visited and not a wall, add it to the stack.
4. If no path is found, return None.`,

        "bfs": `Breadth-First Search (BFS):
1. Initialize the start and end points.
2. Initialize a queue with the start point.
3. While the queue is not empty:
   a. Dequeue the front node from the queue.
   b. If this node is the end node, reconstruct and return the path.
   c. For each neighbor of the current node:
      i. If the neighbor is not visited and not a wall, add it to the queue.
4. If no path is found, return None.`,

        "dijkstras": `Dijkstra's Algorithm:
1. Initialize the start and end points.
2. Initialize distances dictionary with infinite values, except for the start point.
3. Initialize the priority queue with the start point.
4. While the priority queue is not empty:
   a. Pop the node with the lowest distance.
   b. If this node is the end node, reconstruct and return the path.
   c. For each neighbor of the current node:
      i. Calculate the new distance to reach the neighbor.
      ii. If the new distance is lower, update the neighbor’s distance and add it to the priority queue.
5. If no path is found, return None.`,

        "a_star": `A* Algorithm:
1. Initialize the start and end points.
2. Define the heuristic function (Manhattan distance).
3. Initialize distances dictionary with infinite values, except for the start point.
4. Initialize the priority queue with the start point.
5. While the priority queue is not empty:
   a. Pop the node with the lowest heuristic + distance score.
   b. If this node is the end node, reconstruct and return the path.
   c. For each neighbor of the current node:
      i. Calculate the new cost to reach the neighbor.
      ii. If the new cost is lower, update the neighbor’s cost, and add it to the priority queue.
6. If no path is found, return None.`,

        "greedy_bfs": `Greedy Best First Search:
1. Initialize the start and end points.
2. Define the heuristic function (Manhattan distance).
3. Initialize the priority queue with the start point.
4. While the priority queue is not empty:
   a. Pop the node with the lowest heuristic value.
   b. If this node is the end node, reconstruct and return the path.
   c. For each neighbor of the current node:
      i. If the neighbor is not visited and not a wall, add it to the priority queue.
5. If no path is found, return None.`
    };

    return (
        <div className="algorithm-pseudocode">
          <pre>{pseudocode}</pre>
        </div>
    );
}

export default AlgorithmPseudocode;
