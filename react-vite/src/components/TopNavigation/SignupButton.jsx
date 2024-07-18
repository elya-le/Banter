// import { useModal } from "../../context/Modal";
// import SignupFormModal from "../SignupFormModal";

// function SignupButton() {
//   const { setModalContent, setModalVisibility } = useModal();

//   const openSignupModal = () => {
//     setModalContent(<SignupFormModal />);
//     setModalVisibility(true);
//   };

//   return (
//     <button onClick={openSignupModal} className="signup-button">
//       Sign up
//     </button>
//   );
// }

// export default SignupButton;


import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";

function SignupButton() {
  const { setModalContent } = useModal();

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
  };

  return (
    <button onClick={openSignupModal} className="signup-button">
      Sign up
    </button>
  );
}

export default SignupButton;
