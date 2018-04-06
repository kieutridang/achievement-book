import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const months = [['Jan', 'Feb', 'Mar'], ['Apr', 'May', 'Jun'], ['Jul', 'Aug', 'Sep'], ['Oct', 'Nov', 'Dec']];

export default class MonthPicker extends Component {
  state = {}
  handleChange = (month, year) => {
    this.props.handleSelect(moment(year + "-" + month, "YYYY-MM"));
  }
  handleMonthChange = (month) => {
    let { date } = this.props;
    let year = moment(date).year();
    this.handleChange(month, year);
  }
  render() {
    const { date } = this.props;
    let month = moment(date).month();
    let year = moment(date).year();
    return (
      <Calendar>
        <Title>
          <ArrowButton onClick={() => this.handleChange(month + 1, year - 1)}>
            <Arrow src="../../../public/arrow-left.png"></Arrow>
          </ArrowButton>
          <YearTitle>{year}</YearTitle>
          <ArrowButton onClick={() => this.handleChange(month + 1, year + 1)}>
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
                      if (num != month) {
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
  width: 319px;
  padding: 13px 13px;
  border: 1px solid #e4e7e7;
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
  width: 19px;
  height: 19px;
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
  height: 50px;
  cursor: pointer;
  :hover {
    background - color: rgb(228, 231, 231);
  }
`

const SelectedTd = Td.extend`
  background-color: rgb(107, 226, 218);
  color: #fff;
`