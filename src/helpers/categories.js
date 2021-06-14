function categoryAssign(id) {
  const categories = [
    "Ac/Refrigirator Service",
    "Computer/laptop Service",
    "Tv Repair",
    "Development",
    "Tutor",
    "Beauty",
    "Photographer",
    "Driver",
    "Events",
    "Electrician",
    "Carpenter",
    "Plumber",
    "Interior Design",
    "Design",
    "CC Tv Installation",
    "Catering",
  ];

  return categories[Number(id)];
}

export { categoryAssign };
