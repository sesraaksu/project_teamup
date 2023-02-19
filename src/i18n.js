import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        'Sign Up': 'Sign Up',
        'Password mismatch': 'Password mismatch',
        Username: 'Username',
        'Display Name': 'Display Name',
        Password: 'Password',
        'Password Repeat': 'Password Repeat',
        Login: 'Login',
        Logout: 'Logout',
        Users: 'Users',
        Next: 'next >',
        Previous: '< previous',
        Home: 'Home',
        'Load Failure': 'Load Failure',
        'User not found': 'User not found',
        'Unauthorized': 'Unauthorized',
        Edit: 'Edit',
        'Change Display Name': 'Change Display Name',
        Save: 'Save',
        Cancel: 'Cancel',
        'My Profile': 'My Profile',
        'There are no teames': 'There are no teames',
        'Load old teames': 'Load old teames',
        'There are new teames': 'There are new teames',
        'Delete Team': 'Delete Team',
        'Are you sure to delete Team?': 'Are you sure to delete team?'
      }
    },
    tr: {
      translations: {
        'Sign Up': 'Kayıt Ol',
        'Password mismatch': 'Aynı şifreyi giriniz',
        Username: 'Kullanıcı Adı',
        'Display Name': 'Tercih Edilen İsim',
        Password: 'Şifre',
        'Password Repeat': 'Şifreyi Tekrarla',
        Login: 'Sisteme Gir',
        Logout: 'Çık',
        Users: 'Kullanıcılar',
        Next: 'sonraki >',
        Previous: '< önceki',
        Home: 'Anasayfa',
        'Load Failure': 'Liste alınamadı',
        'User not found': 'Kullanıcı bulunamadı',
        'Unauthorized': 'Erişim sağlanamadı',
        Edit: 'Düzenle',
        'Change Display Name': 'Görünür İsminizi Değiştirin',
        Save: 'Kaydet',
        Cancel: 'İptal Et',
        'My Profile': 'Hesabım',
        'There are no teames': 'Teames bulunamadı',
        'Load old teames': 'Geçmiş Teamleri getir',
        'There are new teames': 'Yeni Teamler var',
        'Delete Team': `Team'i sil`,
        'Are you sure to delete Team?': `Team'i silmek istedğinizden emin misiniz?`
      }
    }
  },
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    wait: true
  }
});

const timeageTR = (number, index) => {
  return [
    ['az önce', 'şimdi'],
    ['%s saniye önce', '%s saniye içinde'],
    ['1 dakika önce', '1 dakika içinde'],
    ['%s dakika önce', '%s dakika içinde'],
    ['1 saat önce', '1 saat içinde'],
    ['%s saat önce', '%s saat içinde'],
    ['1 gün önce', '1 gün içinde'],
    ['%s gün önce', '%s gün içinde'],
    ['1 hafta önce', '1 hafta içinde'],
    ['%s hafta önce', '%s hafta içinde'],
    ['1 ay önce', '1 ay içinde'],
    ['%s ay önce', '%s ay içinde'],
    ['1 yıl önce', '1 yıl içinde'],
    ['%s yıl önce', '%s yıl içinde']
  ][index];
};
register('tr', timeageTR);

export default i18n;