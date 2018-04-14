import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const months = [['Jan', 'Feb', 'Mar'], ['Apr', 'May', 'Jun'], ['Jul', 'Aug', 'Sep'], ['Oct', 'Nov', 'Dec']];

export default class MonthPicker extends Component {
  constructor(props){
    super(props);
    const date = moment(props.date.toDate());
    this.state = {
      year: date.year() || moment().year(),
    }
  }

  handleChange = (month, year) => {
    this.props.handleSelect(moment(year + "-" + month, "YYYY-MM"));
  }
  handleMonthChange = (month) => {
    const { date } = this.props;
    const { year } = this.state;
    const newDate = moment(moment(year + "-" + month + "-" + "01").format());
    this.props.handleSelect(newDate);
  }

  isOutsideRange = (date) => {
    return date > moment().add(1, 'month');
  }

  onPrevClick = () => {
    const { year } = this.state;
    this.setState({
      year: year - 1,
    })
  }

  onNextClick = () => {
    const { year } = this.state;
    this.setState({
      year: year + 1,
    })
  }

  render() {
    const { date } = this.props;
    const { year } = this.state;
    let month = moment(date).month();
    return (
      <Calendar>
        <Title>
          <ArrowButton onClick={this.onPrevClick}>
            <Arrow src="../../../public/arrow-left.png"></Arrow>
          </ArrowButton>
          <YearTitle>{year}</YearTitle>
          <ArrowButton onClick={this.onNextClick}>
            <Arrow src="../../../public/arrow-right.png"></Arrow>
          </ArrowButton>
        </Title>
        <TableOfMonth>
          <tbody>
            {
              months.map((arrMonth, index) => {
                let count = index * 3;
                return (
                  <tr key={index}>
                    {arrMonth.map((m, index) => {
                      let num = count + index;
                      if (this.isOutsideRange(moment(year + "-" + (num + 1), "YYYY-MM"))) {
                        return <BlockedTd key={m} >{m}</BlockedTd>;
                      }
                      if (num != month || year != date.year()) {
                        return <Td key={m} onClick={() => this.handleMonthChange(num + 1)}>{m}</Td>;
                      }
                      else {
                        return <SelectedTd key={m} onClick={() => this.handleMonthChange(num + 1)}>{m}</SelectedTd>
                      }
                    })
                    }
                  </tr>)
              })
            }
          </tbody>
        </TableOfMonth>
      </Calendar>
    );
  }
}

const Calendar = styled.div`
  margin: auto;
  width: 90%;
  height: 241px;
  background-color: white;
  padding: 13px 13px;
  /* border: 1px solid #e4e7e7; */
  box-sizing: border-box;
`

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const YearTitle = styled.span`
  font-family: 'Muli';
  font-size: 18px;
  color: #565a5c;
  font-weight: bold;
  text-align: center;
`

const ArrowButton = styled.button`
  cursor: pointer;
  padding: 6px 9px;
  border: 1px solid #e4e7e7;
  background-color: #fff;
  outline: none;
  border-radius: 3px;
  :hover {
    border: 1px solid #c4c4c4;
  }
  :active {
    background - color: rgb(242,242,242);
  }
`

const Arrow = styled.img`
  width: 21px;
  height: 17px;
`

const TableOfMonth = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
  margin-top: 18px;
`

const Td = styled.td`
  border: 1px solid #e4e7e7;
  text-align: center;
  font-family: 'Muli';
  font-size: 14px;
  color: #565a5c;
  height: 35px;
  cursor: pointer;
  :hover {
    background - color: rgb(228, 231, 231);
  }
`

const SelectedTd = Td.extend`
  background-color: rgb(25, 165, 152);
  color: #fff;
`

const BlockedTd = Td.extend`
  color: rgb(195,196,202);
  cursor: default;
  :hover {
    background-color: rgb(255, 255, 255);
  }
`