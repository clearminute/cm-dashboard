import DailyNavigation from './Component';
import addDays from 'clearminute/common/utils/addDays';
import { connect } from 'react-redux';
import { selectDateActionAsync } from 'clearminute/common/redux/asyncActionCreators';


const mapStateToProps = state => ({
  activeDate: state.overview.date,
});

const mapDispatchToProps = dispatch => ({
  handleChangeDate: (date, delta) => {
    const newDate = addDays(date, delta);

    dispatch(selectDateActionAsync(newDate));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DailyNavigation);
