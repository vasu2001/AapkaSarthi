import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {InformationScreen} from '../components/InformationSreen';

export interface PrivacyPolicyProps {
  navigation: DrawerNavigationProp<any>;
}

const data = `Aapkasarthi.com and CallSpace Application is committed to protecting the privacy of visitors to this site (the “Site”) or application. 

At Aapkasarthi.com and CallSpace Application, we want you to have an enjoyable calling experience. And while it is necessary for us to collect certain personal information, we respect and protect your right to privacy as set forth in this Privacy Policy. This Privacy Policy applies to the Site. This Privacy Policy does not apply to other web sites to which we link. You agree that your use of the Site signifies your assent to this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Site.

In order to access this Site, you must first complete the registration process. During the registration process, we collect personal information such as your name and email address. Once you complete and submit your registration, you have opted in to receive email communication from us.

We also collect personal information when you choose to use certain other features of the Site, such as making purchases or electing to receive text messages about upcoming boutiques, promotions or events. When you choose to use these additional features, we require you to provide additional personal information such as your phone number, billing and shipping addresses and credit card information, and we may request additional personal information such as your shopping preferences and demographics.

In addition, through the Site, we automatically gather certain information about the use of the Site, such as how frequently certain areas of the Site are visited, including through the use of cookies, web beacons and other technologies. Most browsers can be set to prevent cookies or to notify you when one is being placed. However, cookies are necessary to access the Site.

If you choose to invite an individual to join Aapkasarthi.com and CallSpace Application, you will need to provide his/her name and email address. Aapkasarthi.com and CallSpace Application stores this information to confirm qualifying orders attributable to your account and to track the results of the invitation referrals.

We will not share or disclose your information to anyone except as described in this Privacy Policy.

We use personally identifiable information in order to give you a more enjoyable, convenient shopping experience and to help us identify and/or provide information, products or services that may be of interest to you. We use your personally identifiable information to support and enhance your use of the Site and its features, including without limitation: fulfilling your order; providing customer service; tracking email invitations you send; and otherwise supporting your use of the Site and its features. We may also track your past purchases to provide you with a personalised profile of your shopping history. In addition, we may notify you about new services or special promotional programs, or send you offers or information.

We may permit certain trusted third parties to access your information in connection with their performance of services to maintain and operate the Site and certain features on the Site. For example, we may use third parties to host the Site; operate various features available on the Site; send emails; analyse data; provide search results and links and assist in fulfilling your orders.

From time to time, we may share your personally identifiable information in connection with strategic relationships. Some of these strategic relationships may include operating a co-branded website or web pages with a strategic partner. You should be aware that these co-branded sites may collect different or additional information. Additionally, we may provide links to our Site to websites controlled by third parties. We have no control over these websites and our privacy policy does not apply to these third-party websites. Please consult the privacy policy of the website you are visiting.

Also, we may share personally identifiable or other information with our parent, subsidiaries, divisions, and affiliates.

Occasionally, we provide our postal mailing list (consisting of customer names and postal mailing addresses, but not email addresses) to other companies whose products we believe may be of interest to you. In order to determine those products that we believe may be of interest to you, the information that you give us and information about your order may be combined with other personally identifiable information (such as demographic information and past purchase history) available from our records and other sources.

We may transfer personally identifiable information as an asset in connection with a proposed or actual merger or sale (including any transfers made as part of an insolvency or bankruptcy proceeding) involving all or part of our business or as part of a corporate reorganisation, stock sale or other change in control.

We reserve the right to disclose information in order to comply with a subpoena, court order, administrative or governmental order, or any other requirement of law, or when we, in our sole discretion, believe it is necessary in order to protect our rights or the rights of others, to prevent harm to persons or property, to fight fraud and credit risk reduction.

We use non-personally identifiable information in the aggregate, so that we can improve the Site and for business and administrative purposes. We may also use or share with third parties for any purpose aggregated data that contains no personally identifiable information.

We are committed to protecting the information we receive from you. We follow reasonable technical and management practices to help protect the confidentiality, security and integrity of data stored on our system. While no computer system is completely secure, we believe the measures we have implemented reduce the likelihood of security problems to a level appropriate to the type of data involved.
​

The Site encrypts your credit card number and other personal information using secure socket layer (SSL) technology to provide for the secure transmission of the information from your PC to our servers. In addition, only those employees and third parties who need access to your information in order to perform their duties are allowed such access.
If you are a registered user, you may access and update your registration information and your preferences to receive email or other communications from us by sending an email to support@Aapkasarthi.com. Please note that your friends and contacts may still choose to send email invitations to you. Any user who receives an email invitation to join the Site may choose not to receive such invitations in the future by following the instructions in the email invitations and, in addition, if you are a member, you may also choose not to receive such invitations by changing your preferences as indicated above. We will take commercially reasonable steps to implement your opt-out requests promptly, but you may still receive communications from us for up to ten business days as we process your request.

While we make efforts to accommodate requests to restrict our use of your information, we reserve the right to delete all or any portion of customer information if we are not able to reasonably accommodate a requested restriction.

If we decide to change our Privacy Policy for the Site, we will post the revised Privacy Policy here so that you will always know what information we gather, how we might use that information and whether we may disclose it to anyone. Your continued use of the Site indicates your assent to the Privacy Policy as posted.`;

export function PrivacyPolicy({navigation}: PrivacyPolicyProps) {
  return (
    <InformationScreen
      navigation={navigation}
      heading="Privacy Policy"
      data={data}
    />
  );
}
