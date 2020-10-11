import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/EnsembleContext";
import EnsembleForm from "../components/EnsembleForm";

const EditEnsemble = ({ navigation }) => {
  const _id = navigation.getParam('_id');
  //checking if we getting ensemble db id ("_id")
  console.log(_id);
  const { state, editEnsemble } = useContext(Context);

  const ensemble = state.find(
    (ensemble) => ensemble._id === _id
  );

  return (
    <EnsembleForm
      initialValues={{ chairs: ensemble.chairs, title: ensemble.title }}
      onSubmit={(chairs, title) => {
        editEnsemble(chairs, title, _id, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditEnsemble;