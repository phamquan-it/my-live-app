import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import Chart from "chart.js/auto";
import React, { useRef, useEffect } from "react";
import Title from "antd/es/typography/Title";
import { InfoCircleOutlined, InfoOutlined } from "@ant-design/icons";
interface infoData {
  recent: number;
  pending: number;
  active: number;
  stop: number;
}
interface liveInfoProps {
  data: infoData;
  time: string;
}
const LiveInfo: React.FC<liveInfoProps> = ({ data, time }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) return;

    let chartStatus = Chart.getChart("myChart");
    if (chartStatus) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Stop", "Active", "Penđing", "New"],
        datasets: [
          {
            label: "Dataset 1",
            data: [data.stop, data.active, data.recent, data.pending],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(60, 164, 38, 0.4)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(60, 164, 38, 0.8)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            textDirection: "ltr",
            align: "end",
            position: "right",
            fullSize: true,
            maxHeight: 4,

            maxWidth: 600,
            // Hide the default legend
          },
          title: {
            display: true,
            text: time,
            align: "start",
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="">
      <div>
        <Title level={4} style={{ visibility: "hidden" }}>
          <InfoCircleOutlined /> Thông tin
        </Title>
        <div style={{ width: "330px", height: "100px" }}>
          <canvas ref={canvasRef} width="200" height="100"></canvas>
        </div>
      </div>
    </div>
  );
};
export default LiveInfo;
