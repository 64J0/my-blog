import React from "react";
import { parseISO, format } from "date-fns";

import { enUS } from "date-fns/locale";

interface DateProps {
  dateString: string;
}

const Date: React.FC<DateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      Posted on {date ? format(date, "d ' of ' LLLL ' of ' yyyy", { locale: enUS }) : "Undefined"}
    </time>
  );
};

export default Date;
