export function stringAvatar(name) {
  // Check if name is defined and has at least two words
  if (name && name.split(" ").length > 1) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  // Handle cases where name is not valid
  return {
    sx: {
      bgcolor: stringToColor(name || "Default Name"),
    },
    children: `${(name || "N").charAt(0)}`,
  };
}

export function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
