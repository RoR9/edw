import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
  render,
} from "@react-email/components";

import * as React from "react";

import { format } from "date-fns";
import { ObjectCar } from "@/app/api/checkExpiry/route";
import { formatDays } from "@/lib/utils";

interface DailyReportProps {
  objCar: ObjectCar;
}

const TRANSLATIONS = {
  inspection: "Revizia tehnica",
  insurance: "Asigurare",
  vignette: "Rovineta",
};

export const DailyReport = ({ objCar }: DailyReportProps) => {
  return (
    <Html>
      <Head />
      <Preview>Raport zilnic</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Column align="right" style={tableCell}>
              <Text style={heading}>Rezumat</Text>
            </Column>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>DATA RAPORTULUI</Text>
                <Text style={informationTableValue}>
                  {format(Date.now(), "dd MMM yyyy")}
                </Text>
              </Column>
            </Row>
          </Section>
          <Section style={carTitleTable}>
            <Text style={carsTitle}>Rezumat</Text>
          </Section>
          {Object.entries(objCar)?.map((car) => {
            const vehicleNumber = car[0];
            const expiringDocs = Object.entries(car[1]);

            return (
              <Section key={vehicleNumber}>
                {/* Vehicle number */}
                <Column style={{ paddingLeft: "22px" }}>
                  <Text style={carTitle}>{vehicleNumber}</Text>
                </Column>

                {expiringDocs.map((doc, i) => {
                  return (
                    <Column key={i} style={{ paddingLeft: "22px" }}>
                      {" "}
                      <Row style={informationTableRow}>
                        <Text style={carTitle}>
                          {TRANSLATIONS[doc[0] as keyof typeof TRANSLATIONS]}
                        </Text>

                        <Text style={carDays}>{formatDays(doc[1])}</Text>
                      </Row>
                    </Column>
                  );
                })}
              </Section>
            );
          })}

          <Hr style={carLine} />
          <Hr style={carLineBottom} />
        </Container>
      </Body>
    </Html>
  );
};

export const DailyEmailHtml = (props: DailyReportProps) =>
  render(<DailyReport {...props} />, {
    pretty: true,
  });

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "28px",
  fontWeight: "300",
  color: "#888888",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
  marginTop: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const carTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const carsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const carTitle = {
  fontSize: "12px",
  fontWeight: "600",
  ...resetText,
};

const carDays = {
  align: "right",
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const carLine = { margin: "30px 0 0 0" };

const carLineBottom = { margin: "0 0 75px 0" };
