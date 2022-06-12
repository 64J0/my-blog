import React from "react";
import { parseISO, format } from "date-fns";

import { ptBR } from "date-fns/locale";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      Postado em {date ? format(date, `d " de " LLLL " de " yyyy`, { locale: ptBR }) : "Não definido"}
    </time>
  );
}
