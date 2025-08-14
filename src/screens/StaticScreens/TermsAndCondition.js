import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import {BackArrow} from '../../assets/SVGs'
import {App_Primary_color} from '../../common/Colors/colors'
import {FONTS_FAMILY} from '../../assets/Fonts'

const TermsAndConditionsScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Last Updated */}
        <View style={styles.lastUpdatedContainer}>
          <Text style={styles.lastUpdatedText}>Last updated: January 15, 2025</Text>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.sectionContent}>
            Welcome to our Influencer Marketing Platform. These Terms and Conditions ("Terms") govern your use of our mobile application and services. By accessing or using our platform, you agree to be bound by these Terms.
          </Text>
        </View>

        {/* Acceptance of Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.sectionContent}>
            By creating an account, accessing, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our services.
          </Text>
        </View>

        {/* User Accounts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. User Accounts</Text>
          <Text style={styles.sectionContent}>
            You must create an account to use certain features of our platform. You are responsible for:
          </Text>
          <Text style={styles.bulletPoint}>• Maintaining the confidentiality of your account credentials</Text>
          <Text style={styles.bulletPoint}>• All activities that occur under your account</Text>
          <Text style={styles.bulletPoint}>• Providing accurate and up-to-date information</Text>
          <Text style={styles.bulletPoint}>• Notifying us of any unauthorized use of your account</Text>
        </View>

        {/* Platform Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Platform Services</Text>
          <Text style={styles.sectionContent}>
            Our platform provides a marketplace connecting influencers and brands for marketing collaborations. Services include:
          </Text>
          <Text style={styles.bulletPoint}>• Profile creation and management</Text>
          <Text style={styles.bulletPoint}>• Campaign discovery and application</Text>
          <Text style={styles.bulletPoint}>• Communication tools</Text>
          <Text style={styles.bulletPoint}>• Payment processing</Text>
          <Text style={styles.bulletPoint}>• Performance analytics</Text>
        </View>

        {/* User Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. User Responsibilities</Text>
          <Text style={styles.sectionContent}>
            As a user of our platform, you agree to:
          </Text>
          <Text style={styles.bulletPoint}>• Comply with all applicable laws and regulations</Text>
          <Text style={styles.bulletPoint}>• Provide truthful and accurate information</Text>
          <Text style={styles.bulletPoint}>• Respect intellectual property rights</Text>
          <Text style={styles.bulletPoint}>• Not engage in fraudulent or deceptive practices</Text>
          <Text style={styles.bulletPoint}>• Maintain professional conduct in all interactions</Text>
        </View>

        {/* Prohibited Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Prohibited Activities</Text>
          <Text style={styles.sectionContent}>
            You may not use our platform to:
          </Text>
          <Text style={styles.bulletPoint}>• Upload malicious software or content</Text>
          <Text style={styles.bulletPoint}>• Spam or send unsolicited communications</Text>
          <Text style={styles.bulletPoint}>• Impersonate others or create fake accounts</Text>
          <Text style={styles.bulletPoint}>• Violate any applicable laws or regulations</Text>
          <Text style={styles.bulletPoint}>• Interfere with platform security or functionality</Text>
        </View>

        {/* Payment Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Payment Terms</Text>
          <Text style={styles.sectionContent}>
            All payments are processed through secure third-party payment processors. By using our payment services, you agree to:
          </Text>
          <Text style={styles.bulletPoint}>• Provide accurate payment information</Text>
          <Text style={styles.bulletPoint}>• Pay all applicable fees and charges</Text>
          <Text style={styles.bulletPoint}>• Comply with payment processor terms</Text>
          <Text style={styles.bulletPoint}>• Accept responsibility for payment disputes</Text>
        </View>

        {/* Intellectual Property */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
          <Text style={styles.sectionContent}>
            The platform and its content are protected by intellectual property laws. You retain ownership of content you create, but grant us a license to use it for platform operations. You may not reproduce, distribute, or create derivative works without permission.
          </Text>
        </View>

        {/* Privacy and Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Privacy and Data Protection</Text>
          <Text style={styles.sectionContent}>
            Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. We implement appropriate security measures to protect your data.
          </Text>
        </View>

        {/* Termination */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Termination</Text>
          <Text style={styles.sectionContent}>
            We may suspend or terminate your account at any time for violation of these Terms or for any other reason. You may also terminate your account at any time. Upon termination, your right to use the platform will cease immediately.
          </Text>
        </View>

        {/* Limitation of Liability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
          <Text style={styles.sectionContent}>
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you paid for our services in the past 12 months.
          </Text>
        </View>

        {/* Disclaimers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Disclaimers</Text>
          <Text style={styles.sectionContent}>
            The platform is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free. We are not responsible for the actions or content of users on the platform.
          </Text>
        </View>

        {/* Governing Law */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Governing Law</Text>
          <Text style={styles.sectionContent}>
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising under these Terms shall be resolved through binding arbitration or in the courts of [Your Jurisdiction].
          </Text>
        </View>

        {/* Changes to Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Changes to Terms</Text>
          <Text style={styles.sectionContent}>
            We reserve the right to modify these Terms at any time. We will notify you of significant changes via email or through the platform. Your continued use of the platform after changes constitutes acceptance of the new Terms.
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>14. Contact Information</Text>
          <Text style={styles.sectionContent}>
            If you have questions about these Terms, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: legal@yourplatform.com</Text>
          <Text style={styles.contactInfo}>Phone: +1 (555) 123-4567</Text>
          <Text style={styles.contactInfo}>Address: 123 Business St, City, State 12345</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using our platform, you acknowledge that you have read and understood these Terms and Conditions.
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default TermsAndConditionsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: App_Primary_color,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  placeholder: {
    width: 50,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  lastUpdatedContainer: {
    backgroundColor: '#E8F4F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: App_Primary_color,
  },
  lastUpdatedText: {
    fontSize: 14,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  sectionContent: {
    fontSize: 13,
    lineHeight: 24,
    color: '#555',
    marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    marginBottom: 6,
    marginLeft: 10,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  contactInfo: {
    fontSize: 16,
    lineHeight: 22,
    color: App_Primary_color,
    marginBottom: 4,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  footer: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
})