const userData = {
  users: Array.from({ length: 50 }, (_, i) => {
    const id = String(i + 1).padStart(3, "0");

    const firstNames = [
      "John",
      "Jane",
      "Michael",
      "Sarah",
      "David",
      "Emily",
      "Daniel",
      "Sophia",
      "James",
      "Olivia",
    ];

    const lastNames = [
      "Smith",
      "Johnson",
      "Garcia",
      "Brown",
      "Martinez",
      "Davis",
      "Miller",
      "Wilson",
      "Moore",
      "Taylor",
    ];

    const roles = ["Admin", "Manager", "Staff", "Customer"];
    const statuses = ["Active", "Inactive", "Suspended"];

    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];

    return {
      id: `USR-${id}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@example.com`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      createdAt: new Date(
        Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365
      )
        .toISOString()
        .split("T")[0],
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    };
  }),
};

export default userData;
