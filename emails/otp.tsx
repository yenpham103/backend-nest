import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OTPEmailProps {
  otpCode: string;
  title: string;
}

const logoUrl = "https://wordpresses-admin.bsscommerce.com/bsscommerce/wp-content/uploads/2024/04/logo-bsscommerce.png";

export const OTPEmail = ({
  otpCode, title
}: OTPEmailProps) => (
  <Html>
    <Head><title>{title}</title></Head>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={logoUrl}
          width="300"
          height="120"
          alt="BSS Commerce"
          style={logo}
        />
        <Text style={tertiary}>Mã xác thực OTP</Text>
        <Heading style={secondary}>
          Hãy nhập mã xác thực vào website của bạn.
        </Heading>
        <Section style={codeContainer}>
          <Text style={code}>{otpCode}</Text>
        </Section>
        <Text style={paragraph}>Nếu bạn không chủ động thực hiện hành động này, xin hãy bỏ qua email này.</Text>
      </Container>
      <Text style={footer}>From Yenx P with love ❤</Text>
    </Body>
  </Html>
);

OTPEmail.PreviewProps = {
  otpCode: '144833',
  title: 'OTP Code',
} as OTPEmailProps;

export default OTPEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eee',
  borderRadius: '5px',
  boxShadow: '0 5px 10px rgba(20,50,70,.2)',
  marginTop: '20px',
  maxWidth: '360px',
  margin: '0 auto',
  padding: '68px 0 130px',
};

const logo = {
  margin: '0 auto',
  objectFit: 'contain' as const,
};

const tertiary = {
  color: '#0a85ea',
  fontSize: '11px',
  fontWeight: 700,
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  height: '16px',
  letterSpacing: '0',
  lineHeight: '16px',
  margin: '16px 8px 8px 8px',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
};

const secondary = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '24px',
  marginBottom: '0',
  marginTop: '0',
  textAlign: 'center' as const,
};

const codeContainer = {
  background: 'rgba(0,0,0,.05)',
  borderRadius: '4px',
  margin: '16px auto 14px',
  verticalAlign: 'middle',
  width: '280px',
};

const code = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '6px',
  lineHeight: '40px',
  paddingBottom: '8px',
  paddingTop: '8px',
  margin: '0 auto',
  width: '100%',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#444',
  fontSize: '15px',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  letterSpacing: '0',
  lineHeight: '23px',
  padding: '0 40px',
  margin: '0',
  textAlign: 'center' as const,
};

const footer = {
  color: '#000',
  fontSize: '12px',
  fontWeight: 800,
  letterSpacing: '0',
  lineHeight: '23px',
  margin: '0',
  marginTop: '20px',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
};