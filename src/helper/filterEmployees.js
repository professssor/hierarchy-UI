export function filterEmployees(treeData, searchTerm) {
  const filteredEmployees = [];
  const queue = [...treeData];

  while (queue.length > 0) {
    const node = queue.shift();

    //filtering logic , will search only members since they are only editable
    if (
      node.type !== "team" &&
      node.type !== "CEO" &&
      node.type !== "Department" &&
      (node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (node.email &&
          node.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (node.phone &&
          node.phone.toLowerCase().includes(searchTerm.toLowerCase())))
    ) {
      filteredEmployees.push(node);
    }

    if (node.children) {
      queue.push(...node.children);
    }
  }

  return filteredEmployees;
}
