function categoryAssign(id) {
  const categories = [
    "Ac/Refrigirator Service",
    "Computer/laptop Service",
    "Tv Repair",
    "Electrician",
    "Interior Design",
    "Design",
    "Development",
    "Events",
    "Beauty",
    "Tutor",
    "Photographer",
    "Driver",
    "Carpenter",
    "Plumber",
    "CC Tv Installation",
    "Catering",
  ];

  return categories[Number(id)];
}

export { categoryAssign };
