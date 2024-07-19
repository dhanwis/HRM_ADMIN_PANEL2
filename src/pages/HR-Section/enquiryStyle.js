import styled from "styled-components";

export const FormContainer = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
`;

export const TableContainer = styled.div`
  width: 90%;
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #4caf50;
  color: white;
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

export const Form = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin: 20px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const TwoColumnRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  flex: 1;
  min-width: 45%;
  margin: 5px;
`;

export const Label = styled.label`
  display: block;
  margin-top: 15px;
  font-weight: bold;
`;

export const Input = styled.input`
  display: block;
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`;

export const Textarea = styled.textarea`
  display: block;
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`;

export const Select = styled.select`
  display: block;
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 5px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  ${({ primary }) =>
    primary
      ? `
        background-color: #4caf50;
        color: white;
    `
      : `
        background-color: #008cba;
        color: white;
    `}

  &:hover {
    opacity: 0.9;
  }
`;

export const StepIndicators = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#4caf50" : "#ddd")};
  color: white;
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
`;
export const StepLabel = styled.div`
  font-size: 12px;
  text-align: center;
`;

export const InstallmentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InstallmentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const FollowupContainer = styled.div`
  margin-top: 20px;
`;

export const FollowupRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
