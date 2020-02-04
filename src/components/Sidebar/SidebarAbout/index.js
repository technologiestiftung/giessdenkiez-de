import React from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';

const StyledParagraph = styled.p`
  width: 300px;
  line-height: 150%;
  margin-top: 0;
`;

const SidebarAbout = p => {
  return (
    <>
      <SidebarTitle>Über das Projekt</SidebarTitle>
      <StyledParagraph>
        Die Berliner Stadtbäume leiden unter starker Trockenheit, was langfristig das gesamte Berliner Ökosystem gefährdet. Im Projekt Internet der Bäume entwickeln wir digitale Strategien und Prototypen zur Stärkung des Berliner Baumbestandes.
      </StyledParagraph>
      <StyledParagraph>
        Hier sollen neben einer interaktiven Darstellung des Baumkatasters zukünftig weitere Daten, etwa zu Niederschlagsmengen und Bodenfeuchte, integriert werden. In zukünftigen Iterationen soll es möglich werden, einzelne Bäume zu abonnieren und sich z.B. über E-Mail oder Twitter informieren zu lassen, falls ein Baum über längere Zeit kein Wasser erhalten hat. Mittelfristig ist ein Test des Systems in einem abgegrenzten Netz an Bäumen geplant, mithilfe dessen weitere qualitative Daten zum Zustand der Bäume erhoben werden können.
      </StyledParagraph>
    </>
  )
}

export default SidebarAbout;