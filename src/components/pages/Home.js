import React, { useEffect } from "react";
import Sidebar from "../../components/elements/Sidebar";

import { logout, preDataLoad } from "../../redux/actions";
import "../../css/home.css";

import { connect } from "react-redux";
function Home(props) {

  useEffect(() => {
    props.fetchDataBeforeLoadingSite();
  }, [
    props.catagoryAdded,
    props.catagoryDeleted,
    props.authorAdded,
    props.authorDeleted,
    props.sourceAdded,
    props.sourceDeleted,
  ]);

  useEffect(() => {
    props.fetchDataBeforeLoadingSite();
  }, []);


  return (
    <>
      <div>
        <Sidebar />
      </div>
    </>
  );
}



const mapStateToProps = (state) => {

  const {
    authorAdded,
    authorDeleted,
    catagoryAdded,
    catagoryDeleted,
    sourceAdded,
    sourceDeleted,
  } = state.SettingsHandler;

  const { preLoading } = state.preDataHandler;

  return {
    catagoryAdded: catagoryAdded,
    catagoryDeleted: catagoryDeleted,
    preLoading: preLoading,
    authorAdded: authorAdded,
    authorDeleted: authorDeleted,
    sourceAdded: sourceAdded,
    sourceDeleted: sourceDeleted,
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchDataBeforeLoadingSite: () => dispatch(preDataLoad()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
