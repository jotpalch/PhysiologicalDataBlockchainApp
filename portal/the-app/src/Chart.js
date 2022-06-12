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
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { Container, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// Generate Sales Data
function createData(time, value) {
  return { time, value };
}

export default function Chart(props) {
  const theme = useTheme();
  const pk = useSelector((state) => state.pk);

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8877/api/${pk}/${props.pro}/${props.uri}`)
      .then((response) => {
        setData(
          response.data
            .filter((temp) => {
              var now = new Date();
              var offset = now.setDate(now.getDate() - props.span);
              return (
                new Date(temp.Time_Stamp) > offset &&
                new Date(temp.Time_Stamp) <= new Date()
              );
            })
            .map((temp) =>
              createData(
                // new Date(temp.Time_Stamp),
                new Date(temp.Time_Stamp).toLocaleString("en-US", {
                  hour12: false,
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                // new Date(temp.Time_Stamp).toLocaleString("en-US"),
                parseFloat(temp[props.class].toFixed(1))
              )
            )
        );
        setLoading(false);
      });
  }, [pk, props.span, props.pro]);
  // UseEffect的後面的 [] 用來控制上面的get只跑一次

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Title>{props.class.replace("_", " ")}</Title>
        <Title sx={{ color: "yellow"}}> {props.pro}</Title>
      </Container>

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
            interval={props.span * 80}
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
