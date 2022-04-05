import React, { FC, useState } from 'react';
import EasyEdit, {Types} from 'react-easy-edit';
import styled from 'styled-components';
import Done from '@material-ui/icons/Done'
import Close from '@material-ui/icons/Close'
import Pencil from '@material-ui/icons/Edit'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ExpandablePanel from '../ExpandablePanel';
import SmallParagraph from '../SmallParagraph';
import Paragraph from '../Paragraph';
import { useUserProfileActions } from '../../utils/hooks/useUserProfileActions';
import { UserProfile } from '../../common/interfaces';

const CredentialValue = styled.p`
  display: block;
  font-size: ${p => p.theme.fontSizeL};
  margin: 0 0 4px;
`;

const EditField = ({ name, index, prefix, value, save, hint }) => {
  const [loading, setLoading] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  return (
    <div style={{ paddingBottom: "5px" }}>
      <SmallParagraph>{name}</SmallParagraph>
      <CredentialValue>
        { loading && (
          <div style={{ width: "100%" }}>
            <Loader type="ThreeDots" color="#37DE8A" height={20} width={40} />
          </div>
        )}
        {!loading && (
          <EasyEdit
            type={Types.TEXT}
            onSave={async val => {
              setLoading(true);
              await save(val);
              setDisplayValue(val);
              setLoading(false);
            }}
            saveButtonLabel={<Done style={{ fontSize: 14 }} />}
            cancelButtonLabel={<Close style={{ fontSize: 14 }} />}
            attributes={{ name, id: `edit-${prefix}-${index}` }}
            instructions={<div style={{ paddingTop: "5px" }}>{hint}</div>}
            placeholder={"Zum Bearbeiten, bitte klicken!"}
            displayComponent={<>
              <div style={{ float: "left"}}>{displayValue || ""}</div>
              <Pencil style={{ paddingLeft: "5px", fontSize: 14 }} />
            </>}
            value={displayValue}
          />
        )}

      </CredentialValue>
    </div>
  )
}

const CardCredentials: FC<{
  userId: string,
  email: string,
  username: string,
  userProfile: UserProfile,
}> = ({ email, username, userProfile }) => {
  const profileActions = useUserProfileActions();
  const fields = [
    {
      name: "Selbstgewählter Benutzername, optional", 
      value: userProfile.prefered_username || username, 
      save: profileActions.changeUsername, 
      hint: "Wenn kein Benutzername existiert, wird in der App nur der erste Teil der E-Mail Adresse angezeigt"
    },
  ];
  const optionalFields = [
      {
      name: "Anrede", 
      value: userProfile.salutation, 
      save: profileActions.changeSalutation, 
      hint: "optional: Wie möchtest Du in Newsletter-E-Mails angesprochen werden? Herr, Frau, oder einfach freilassen, wenn wir Dich duzen sollen"
    },
    {
      name: "Vorname", 
      value: userProfile.given_name, 
      save: profileActions.changeGivenName, 
      hint: "optional"
    },
    {
      name: "Nachname", 
      value: userProfile.family_name, 
      save: profileActions.changeFamilyName, 
      hint: "optional, kann auch abgekürzt angegeben werden, z.B. A."
    },
    {
      name: "Straße inklusive Hausnummer", 
      value: userProfile.street_with_number, 
      save: profileActions.changeStreetWithNumber, 
      hint: "optional, kann auch ein Adresse eines öffentlichen Platzes / Einrichtung in Deiner Nähe sein, es geht nur darum, Dich ungefähr zu verorten, wenn wir lokale Giess-Veranstaltungen / Giess-Gruppen-Treffen planen"
    },
    {
      name: "PLZ", 
      value: userProfile.zipcode, 
      save: profileActions.changeZipcode, 
      hint: "optional"
    },
    {
      name: "Telefon", 
      value: userProfile.phone_number, 
      save: profileActions.changePhoneNumber, 
      hint: "optional"
    }
  ];

  return (
    <ExpandablePanel isExpanded title='Dein Account'>
      <div style={{ paddingBottom: "5px" }}>
        <SmallParagraph>Registrierte E-Mail Adresse:</SmallParagraph>
        <CredentialValue>{email}</CredentialValue>
      </div>

      { fields.map((field, index) => (
        <EditField {...field } prefix={"req"} key={`edit-req-${index}-key`} index={index} />
      ))}

      <Paragraph>
        Mit Hilfe der folgenden Daten können wir Dir Vorschläge für den Austausch mit anderen, 
        in Deiner Nähe wohnenden Gießenden machen, lokale Gießtreffen und Gießgemeinschaften 
        planen oder Dich auch mal telefonisch erreichen etc.
      </Paragraph>
      <Paragraph>
        <div style={{ float: "left", paddingRight: "5px" }}>Optionale, </div>
        <div style={{ fontWeight: "bold", float: "left", paddingRight: "5px" }}>nicht in der App angezeigte</div>
        <div> Daten:</div>
      </Paragraph>

      { optionalFields.map((field, index) => (
        <EditField {...field } prefix={"opt"} key={`edit-opt-${index}-key`} index={index} />
      ))}

      <Paragraph>
        <div style={{ fontWeight: "bold" }}>
          Optionale Daten werden nie auf den App-Oberflächen angezeigt und nie an Dritte - auch nicht an andere Gießende - weitergeleitet!
        </div>
      </Paragraph>
      <Paragraph>
        Siehe auch <a href="https://stiftung-ecken-wecken.de/datenschutz">Details zum Datenschutz</a>
      </Paragraph>


    </ExpandablePanel>
  );
}

export default CardCredentials;