import React, { FC } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
// <<<<<<< HEAD
// =======
// import store from '../../state/Store';
// import { useAuth0 } from '../../utils/auth/auth0';
// import { Tree } from '../../common/interfaces';
// import { getTreesAdoptedByUser } from '../../utils/requests/getTreesAdoptedByUser';
// import { unadoptTree } from '../../utils/requests/unadoptTree';
// import { useHistory } from 'react-router';
// >>>>>>> bcd0547b653aa3fe3848547ebbb3ceead657a918

const StyledTreeButton = styled.div`
  font-size: 12px;
  border: 1px solid ${p => p.theme.colorTextDark};
  border-radius: 100px;
  display: inline-flex;
  padding: 4px 5px 6px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: 0.125s opacity ease-in-out, box-shadow 200ms ease-out;
  margin-bottom: 10px;
  cursor: pointer;
  gap: 8px;

  &:hover {
    transition: 0.125s opacity ease-in-out;
    background: ${p => p.theme.colorTextDark};
    color: white;

    svg {
      transition: 0.125s opacity ease-in-out;
      fill: white;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px;
  }

  svg {
    width: 0.75em;
    height: 0.75em;
    transition: 0.125s opacity ease-in-out;
  }
`;

const Label = styled.span``;

const TreeButton: FC<{
  label?: string;
  onClickHandler: () => void;
}> = ({ label, onClickHandler }) => {
  return (
    <StyledTreeButton role={'button'} tabIndex={0} onClick={onClickHandler}>
      <Label>{label ? label : 'Baum'}</Label>
      <CloseIcon />

      {/* //   const { user, getTokenSilently } = useAuth0();
//   const history = useHistory();
//   const [unadopting, setUnadopting] = useState<string | undefined>(undefined);

//   const onCloseIconClick = useCallback(
//     async (id: string, userId: string) => {
//       setUnadopting(id);
//       try {
//         const token = await getTokenSilently();
//         await unadoptTree(id, userId, token);
//         const adoptedTrees = await getTreesAdoptedByUser({ userId, token });
//         store.setState({ adoptedTrees });
//       } catch (err) {
//         console.error(err);
//       }
//       setUnadopting(undefined);
//     },
//     [store, setUnadopting]
//   );

//   return (
//     <StyledTreeButton
//       role={'button'}
//       tabIndex={0}
//       onClick={evt => {
//         evt.preventDefault();
//         history.push(`/tree/${tree.id}`);
//       }}
//     >
//       <Label>
//         {unadopting ? 'Entferne' : label || tree.artdtsch || 'Baum'}
//       </Label>
//       <CloseIcon
//         onClick={evt => {
//           evt.preventDefault();
//           evt.stopPropagation();
//           tree.id && onCloseIconClick(tree.id, user.sub);
//         }}
//       />
// >>>>>>> bcd0547b653aa3fe3848547ebbb3ceead657a918
        */}
    </StyledTreeButton>
  );
};

export default TreeButton;
