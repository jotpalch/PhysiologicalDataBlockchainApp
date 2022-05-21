import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import axios from "axios";


// Generate Sales Data
function createData(time, value) {
  return { time, value };
}

export default function Chart(props) {
  const theme = useTheme();

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);


  React.useEffect(() => {
    axios
      .get(`http://localhost:8877/${props.uri}/pxnzmzstX6FhoTl7A6ZUKnA2BGtSzs8R`)
      .then((response) => {
        setData(
          response.data.map((temp) =>
            createData(
              new Date(temp.Time_Stamp.I * 1000).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              parseFloat(temp[props.class].toFixed(1))
            )
          )
        );
        setLoading(false);
      });
  }, []);
  // UseEffect的後面的 [] 用來控制上面的get只跑一次

  if(isLoading) {
    return <h2> loading... </h2>
  }

  return (
    <React.Fragment>
      <Title>{props.class.replace("_"," ")}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            interval={23}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            domain={["auto", "auto"]}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              {props.class}
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="value"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
