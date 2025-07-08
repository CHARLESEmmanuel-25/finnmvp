
function getLastWeekRange() {
  const today = new Date();

  // Reculer d'une semaine
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  // Calcul du lundi de la semaine précédente
  const dayOfWeek = lastWeek.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  const monday = new Date(lastWeek);
  monday.setDate(lastWeek.getDate() + diffToMonday);

  // Calcul du dimanche suivant
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // Format en YYYY-MM-DD
  const format = (date) => date.toISOString().split('T')[0];

  return {
    dateFrom: format(monday),
    dateTo: format(sunday)
  };
}

export default getLastWeekRange;