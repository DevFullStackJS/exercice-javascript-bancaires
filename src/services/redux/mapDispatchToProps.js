import crud from './actions/crud';

const mapDispatchToProps = (dispatch) => ({
  getAllCrud: (payload, cb) => dispatch(crud.getAllCrud(payload,cb)),
});
  
export default mapDispatchToProps;