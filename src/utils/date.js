const padLeft = (chr) => (chr < 10 ? `0${chr}` : chr);

export const dateSlices = (date) => {
  const d = new Date(date);

  const dd = padLeft(d.getDate());
  const MM = padLeft(d.getMonth() + 1);
  const yyyy = padLeft(d.getFullYear());
  const HH = padLeft(d.getHours());
  const mm = padLeft(d.getMinutes());
  const ddMMyy = `${dd}-${MM}-${yyyy}`;
  const HHmm = `${HH}:${mm}`;

  return {
    dd,
    MM,
    yyyy,
    HH,
    mm,
    ddMMyy,
    HHmm,
  };
};

export const formatDate = (date, options) => {
  const { ddMMyy, HHmm } = dateSlices(date);

  return options?.time ? `${ddMMyy} ${HHmm}` : ddMMyy;
};

export const pipeDate = (date, options) => {
  const d = new Date(date);
  const { dd, MM, yyyy, HH, mm } = dateSlices(d);

  return options?.time
    ? `${yyyy}-${MM}-${dd}T${HH}:${mm}`
    : `${yyyy}-${MM}-${dd}`;
};
