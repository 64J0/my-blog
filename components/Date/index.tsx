import React from "react";
import { parseISO, format } from "date-fns";

import { ptBR } from "date-fns/locale";

interface DateProps {
  dateString: string;
}

const Date: React.FC<DateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      Postado em {date ? format(date, "d ' de ' LLLL ' de ' yyyy", { locale: ptBR }) : "Não definido"}
    </time>
  );
}

export default Date;