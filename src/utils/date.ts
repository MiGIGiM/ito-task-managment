export const validateDate = (date: Date) => {
    const today = new Date()

    if (today.setHours(0,0,0,0) > date.setHours(0,0,0,0)) return true

    return false
}

export const formatDate = (date = new Date()) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}