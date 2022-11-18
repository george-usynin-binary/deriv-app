const containers = {
    account_transfer: 'account_transfer',
    deposit: 'deposit',
    payment_agent: 'payment_agent',
    payment_agent_transfer: 'payment_agent_transfer',
    withdraw: 'withdraw',
};

const map_action = {
    withdraw: 'payment_withdraw',
    payment_agent: 'payment_agent_withdraw',
};

const icon_payment_methods = {
    Alipay: ['alipay'],
    Bank: [
        'bank',
        'bankdeposit',
        'banks',
        'banktransfer',
        'bankwire',
        'bankwiretransfer',
        'localbankwire',
        'localbank',
        'localbanks',
        'localbanktransfer',
    ],
    Bankbri: ['bri', 'bankbri'],
    Bca: ['bca', 'grupbca'],
    Bch: ['bch'],
    Bni: ['bni'],
    Bitcoin: ['bitcoin', 'btc'],
    Card: ['card', 'cards', 'visa', 'mastercard'],
    Cimbniaga: ['cimbniaga'],
    Crypto: ['crypto', 'cryptos', 'cryptocurrencies', 'cryptocurrency', 'weacceptcrypto'],
    Dai: ['dai'],
    Diamondbank: ['diamondbank'],
    Eth: ['eth', 'ethd', 'ethereum'],
    Ewallet: ['ewallet', 'ewallets', 'ewalletpayment', 'skrill'],
    Firstbank: ['firstbank'],
    Gtbank: ['gtbank'],
    Icbc: ['icbc'],
    Libertyreserve: ['libertyreserve'],
    LiteCoin: ['ltc', 'litecoin'],
    Mandiri: ['mandiri'],
    Mandirisyariah: ['mandirisyariah'],
    Moneygram: ['moneygram'],
    Paypal: ['paypal'],
    PerfectMoney: ['perfectmoneyandwebmoney', 'perfectmoney'],
    Permatabank: ['permatabank'],
    Tether: ['tether'],
    Verve: ['verve'],
    WebMoney: ['perfectmoneyandwebmoney', 'webmoney'],
    Wechatpay: ['wechatpay'],
    Zenithbank: ['zenithbank'],
};

const payment_methods = {
    AbokiFX: ['A BOKI FX'],
    'ABSA Bank': [
        'Absa',
        'ABSA',
        'ABSA Bank',
        'ABSABank',
        'ABSABANK',
        'ABSA Bank Transfer',
        'ABSA Cash Send',
        'Absa fund transfer and orange money services',
        'ABSA GHANA LIMITED',
        'Direct deposit FNB and ABSA',
    ],
    'Access bank': ['Access bank', 'Access Bank', 'AccessBank', 'ACCESS BANK', 'Acess Bank'],
    'Access forex': ['Access Forex', 'ACCESS FOREX', 'Access forex'],
    'Afriland First Bank': ['Afriland First Bank', 'AFRILAND FIRST BANK'],
    'Airtel Mobile money': [
        'airtel',
        'Airtel',
        'AIRTEL MOBILE MONEY',
        'airtel money',
        'Airtel money',
        'Airtelmoney',
        'Airtel Money',
        'AirtelMoney',
        'AIRTEL MONEY',
        'Airtel Tigo',
        'all mobile money',
    ],
    Airtm: ['airtm', 'Airtm'],
    AlfalahBank: ['AlfalahBank', 'bank alfalfa'],
    'All banks': [
        'All local banks',
        'All local Banks',
        'All local banks ZWL',
        'All Local Bank transfer',
        'bank',
        'Bank',
        'BANK',
        'banks',
        'Banks',
        'local banks',
        'Local banks',
        'Local Banks',
        'Pakistani Local All banks',
    ],
    Astropay: ['astropay', 'Astropay', 'Astro Pay'],
    'ATM transfer': ['ATM', 'ATMDeposits', 'ATM transfer', 'ATM Transfer', 'BanktransferATM', 'FNB ATM deposit'],
    AzamPesa: ['Azampesa'],
    'Banco Bradesco': ['Bradesco'],
    'Banco de Pichincha': ['BANCO DE PICHINCHA'],
    'Banco de Produbanco': ['BANCO DE PRODUBANCO'],
    'Banco del Pacifico': ['BANCO DE PACIFICO'],
    'Banco Internacional': ['BANCO INTERNACIONAL'],
    'Banco Internacional de Moçambique (BIM)': ['Bim'],
    'Bancobu Bank eNoti': ['Bancobu e-noti'],
    'Bank AL Habib': ['bank al habib'],
    'Bank Negara Indonesia (BNI)': ['BNI'],
    'Bank Of Ceylon': ['Bankofceylon'],
    'Bank Rakyat Indonesia (BRI)': ['BankBri', 'BankBRI', 'BRI'],
    'Bank transfer': [
        'All Local Bank payment Accept',
        'All local bank payments',
        'All Local Bank transfer',
        'bank',
        'Bank',
        'BANK',
        'Banks BHIMUP BTC Ewallet GooglePay LocalBank Paypal Paytm Perfect Money PhonePhe',
        'Bank and E-wallet',
        'bank deposit',
        'Bank deposit',
        'Bankdeposit',
        'Bank Deposit',
        'Bank deposits',
        'bank ewallet',
        'bank payment',
        'banks',
        'Banks',
        'Bank to Bank account transfer',
        'bank transfer',
        'Bank transfer',
        'Banktransfer',
        'Bank Transfer',
        'BankTransfer',
        'BANK TRANSFER',
        'BANKTRANSFER',
        'bank transfer and all form of E-payments',
        'Bank Transfer and all Forms of E-payments',
        'BanktransferATM',
        'bank transfers',
        'Bank transfers',
        'Bank Transfers',
        'Ban transfer',
        'Depositos direto em conta',
        'Direct deposit FNB and ABSA',
        'E-wallet Bank transfer',
        'Internet Banking',
        'Internet transfer',
        'Internet Transfer',
        'LocalBank',
        'local banks',
        'Local banks',
        'Local Banks',
        'Local bank transfer',
        'Local bank Transfers',
        'Local deposits',
    ],
    'Bank wire': [
        'bank',
        'Bank',
        'BANK',
        'bank payment',
        'banks',
        'Banks',
        'bank wire',
        'bankwire',
        'Bank wire',
        'Bankwire',
        'Bank Wire',
        'BankWire',
        'BANKWIRE',
        'Bank wire and e-wallets',
        'Bank wire and E-wallets',
        'Bank wires',
        'Bankwires',
        'bank wires and e-wallet',
        'Bank wires and e-wallets',
        'BankWire transfer',
        'E-wallets and bank wires',
        'local bank wire',
        'LocalBankWire',
        'Wire Bank Transfer',
        'WIRE TRANSFER',
    ],
    BankABC: ['BANCABC BANK'],
    'BCA bank': ['BCA'],
    'BMCE Bank': ['Bmce Bank'],
    'CABS Bank': ['Cabs bank', 'CABS transfer'],
    Card: [
        'Card',
        'card',
        'cards',
        'Cards',
        'Credit card',
        'Debit Card',
        'Mastercard',
        'MasterCard',
        'visa',
        'Visa',
        'VISA',
        'Visa card',
    ],
    Cash: [
        'cash',
        'Cash',
        'Cash deposit',
        'Cash deposits',
        'Cash in USD or Local',
        'electronic transfers and cash deposits',
        'FNB cash deposit',
        'physical local and foreign bank notes',
        'USD',
        'USD cash',
    ],
    'Cash send ABSA bank': [
        'ABSA Cash Send',
        'Cashsend',
        'Cash Send',
        'CashSend',
        'cash send Absa',
        'Cash send Absa bank',
    ],
    'Chipper Cash': ['Chipper', 'Chippercash'],
    'CIH Bank': ['Cih Bank'],
    CIMB: ['CIMB', 'CIMBNIAGA'],
    'Commercial Bank': ['Commercialbank'],
    Crypto: [
        'Banks BHIMUP BTC Ewallet GooglePay LocalBank Paypal Paytm Perfect Money PhonePhe',
        'bitcoin',
        'Bitcoin',
        'BITCOIN',
        'bitcoins',
        'Bitcoins',
        'btc',
        'BTC',
        'btc smega',
        'Cripto',
        'crypto',
        'Crypto',
        'cryptocurrencies',
        'Cryptocurrencies',
        'Crypto Currencies',
        'CRYPTOCURRENCIES',
        'cryptocurrency',
        'Cryptocurrency',
        'CRYPTOCURRENCY',
        'Cryptos',
        'ETH',
        'eUSDT',
        'EUSDT',
        'LTC',
        'Tether',
        'TRON',
        'USDC',
        'USDT',
        'UST',
        'We accept Crypto',
    ],
    'Diamond Bank': ['Diamond bank', 'Diamond Bank', 'DiamondBank'],
    'E-Mola': ['E-mola', 'Emola'],
    'E-money': ['e money'],
    'E-payment': [
        'all form of E-payments',
        'All form of E-payments',
        'all forms of E-payments',
        'and all other forms of Epayment',
        'bank transfer and all form of E-payments',
        'Bank Transfer and all Forms of E-payments',
        'E-payments',
        'Epayments',
    ],
    'E-transfer': ['electronic transfers and cash deposits', 'E-Transfers'],
    'E-wallet': [
        'Banks BHIMUP BTC Ewallet GooglePay LocalBank Paypal Paytm Perfect Money PhonePhe',
        'Bank and E-wallet',
        'bank ewallet',
        'Bank wire and e-wallets',
        'Bank wire and E-wallets',
        'bank wires and e-wallet',
        'Bank wires and e-wallets',
        'Digital Wallets',
        'electronic wallets',
        'e-wallers',
        'e-wallet',
        'ewallet',
        'eWallet',
        'E-wallet',
        'Ewallet',
        'EWALLET',
        'E-wallet Bank transfer',
        'E wallet FNB',
        'E-wallet payment',
        'Ewallet payment',
        'e-wallets',
        'ewallets',
        'e-Wallets',
        'e-WALLETS',
        'E- wallets',
        'E-wallets',
        'Ewallets',
        'E-Wallets',
        'E-wallets and bank wires',
        'fnb ewallet',
        'MY WALLET',
        'wallet',
    ],
    Easypaisa: ['easypaisa', 'Easy paisa', 'Easypaisa', 'Easy Paisa', 'EasyPaisaTransfer'],
    Ecobank: ['Ecobank', 'Eco Bank', 'ECO BANK', 'Eco bank Transfers'],
    EcoCash: [
        'Eco cash',
        'Ecocash',
        'EcoCash',
        'ECOCASH',
        'Ecocash FCA',
        'Ecocash method',
        'ECOCASH WALLET',
        'Ecocash ZWL',
    ],
    'Electronic Funds Transfer (EFT)': ['EFT'],
    'Equity Bank': ['Equity bank', 'Equity Bank'],
    'EU Mobile Money': ['all mobile money', 'EU MONEY'],
    EzyPesa: ['Ezypesa', 'Ezzy pesa', 'Ezzy Pesa', 'EzzyPesa'],
    FasaPay: ['fasapay', 'Fasa pay'],
    'Fast Payment': ['Fast payment'],
    'Faysal Bank': ['FaysalBank'],
    'FBC Bank': ['FBC BANK'],
    Finbank: ['Fin bank', 'FinBank'],
    'First Bank of Nigeria': ['First bank', 'First Bank', 'FirstBank', 'FIRST BANK'],
    'First City Monument Bank (FCMB)': ['FCMB', 'fcmb'],
    'First National Bank (FNB)': [
        'Direct deposit FNB and ABSA',
        'E wallet FNB',
        'First National Bank',
        'fnb',
        'FNB',
        'FNB ATM deposit',
        'Fnbbank',
        'FNB Bank',
        'FNBB Bank Transfer',
        'FNB cash deposit',
        'fnb ewallet',
        'FNB First National Bank',
        'FNB pay2cell',
        'FNB pay to cell',
        'FNB pay to sell',
        'Pay to cell FNB',
    ],
    Gmoney: ['Gmoney', 'GMONEY'],
    'Google Pay': [
        'Banks BHIMUP BTC Ewallet GooglePay LocalBank Paypal Paytm Perfect Money PhonePhe',
        'Google pay',
        'gpay',
        'Gpay',
    ],
    'Grup BCA': ['GrupBCA'],
    'GT bank': ['Gtb', 'GTB', 'Gt Bank', 'GT Bank', 'GTBank', 'GT BANK'],
    Halopesa: ['halopesa', 'Halo pesa', 'Halopesa', 'Halo Pesa', 'HaloPesa', 'HALOPESA'],
    'Hatton National Bank': ['HattonNationalBank'],
    'IMPS Transfer': ['imps', 'Imps', 'IMPS', 'IMPS Transfer'],
    Innbucks: ['Innbucks', 'INNBUCKS'],
    'Instant Money': ['InstantMoney', 'Instant money stambic bank', 'Instant money stanbic'],
    'Inter Bank Fund Transfer': ['InterBankfundtransfer', 'Interbank Transfer'],
    'Itau Bank': ['Itau'],
    IZI: ['IZI', 'Izzy'],
    JazzCash: ['jazzcash', 'Jazz cash', 'Jazzcash', 'Jazz-Cash', 'JazzCashTransfer'],
    Jeton: ['Jeton', 'jeton'],
    'Kuda Bank': ['Kuda Bank', 'KUDA BANK', 'Kuda MFB', 'KudaMFB', 'KUDA MICROFINANCE BANK 2014563937'],
    'Luno Wallet': ['Luno', 'Luno crypto wallet'],
    'Mandiri Bank': ['Mandiri', 'MANDIRI', 'MandiriSyariah'],
    'Meezan Bank': ['Meezan Bank', 'MeezanBank'],
    MIX: ['mix', 'Mix', 'MIX', 'Mixed'],
    'Mobile money': [
        'all mobile money',
        'mobile banking',
        'Mobile banking',
        'Mobile money',
        'Mobile Money',
        'MobileMoney',
        'Mobile money MTN',
        'Mobile Money transfer',
        'MOBILE MONEY TRANSFER',
    ],
    'Mojo Mula': ['Mojo money', 'Mojo Mula', 'MOJO MULA', 'MoMo pay'],
    MoMo: ['MoMo', 'MOMO', 'MoMo pay', 'MTN MOMO', 'MTNMOMO'],
    MoneyGram: ['Moneygram', 'Money Gram', 'MoneyGram', 'Money grame'],
    'M-PESA': [
        'AbesafaricomMpesa Transfers',
        'mpesa',
        'M pesa',
        'M-pesa',
        'Mpesa',
        'M Pesa',
        'M-Pesa',
        'MPesa',
        'M PESA',
        'M-PESA',
        'MPESA',
        'M-Pesa Tigo-Pesa T-Pesa',
        'Pesa',
        'safaricom mpesa',
    ],
    'MTN MOMO': [
        'all mobile money',
        'Mobile money MTN',
        'MoMo',
        'MOMO',
        'MTN',
        'MTN mobile money',
        'MTN Mobile money',
        'MTN Mobile Money',
        'MTN MOBILE MONEY',
        'MTNMOBILEMONEY',
        'MTN MOMO',
        'MTNMOMO',
        'MTN MONEY',
    ],
    'Mukuru money transfers': ['Mukuru', 'Mukuru money transfers'],
    'MyZaka Mascom Money': [
        'mascom',
        'mascom myZaka',
        'Mascom MyZaka',
        'myzaka',
        'My zaka',
        'Myzaka',
        'MyZaka',
        'My zaka mascom money',
    ],
    Neft: ['neft', 'Neft', 'NEFT'],
    Nequi: ['Nequi o Daviplata al 300 6839026'],
    Neteller: ['neTeller', 'Neteller', 'NETELLER'],
    'Nigeria local bank': ['Nigeria Local', 'Nigeria local bank', 'NIGERIA LOCAL BANK'],
    'One Money': ['OM', 'Onemoney', 'One Money', 'One money service'],
    Opay: ['Opay', 'OPAY'],
    'Orange Money Transfer': [
        'Absa fund transfer and orange money services',
        'Orange Cameroon',
        'orange money',
        'orangemoney',
        'Orange money',
        'Orangemoney',
        'Orange Money',
        'OrangeMoney',
        'ORANGE MONEY',
        'Orange Money Transfer',
    ],
    'Pay safe Card': ['paysafecard', 'Pay safe Card'],
    Pay2Cell: [
        'FNB pay2cell',
        'FNB pay to cell',
        'FNB pay to sell',
        'Pay2cell',
        'Pay2Cell',
        'PAY2CELL',
        'pay to cell',
        'Pay to cell',
        'Paytocell',
        'Pay to Cell',
        'Pay to cell FNB',
    ],
    'Payment Checks': ['Payment checks', 'Payment Checks'],
    PayPal: [
        'Banks BHIMUP BTC Ewallet GooglePay LocalBank Paypal Paytm Perfect Money PhonePhe',
        'Paypal',
        'PayPal',
        'PAYPAL',
    ],
    PayTM: ['Banks BHIMUP BTC Ewallet GooglePay LocalBank Paypal Paytm Perfect Money PhonePhe', 'Paytm', 'PayTM'],
    'Perfect Money': [
        'Banks BHIMUP BTC Ewallet GooglePay LocalBank Paypal Paytm Perfect Money PhonePhe',
        'perfect money',
        'perfectmoney',
        'Perfect money',
        'Perfectmoney',
        'Perfect Money',
        'PerfectMoney',
        'PERFECT MONEY',
        'Perfect Money and Webmoney',
        'PM',
    ],
    'Permata Bank': ['PermataBank'],
    PhonePhe: [
        'Banks BHIMUP BTC Ewallet GooglePay LocalBank Paypal Paytm Perfect Money PhonePhe',
        'Phonepay',
        'phonepe',
        'Phonepe',
        'PhonePe',
    ],
    Pix: ['Pix', 'PIX'],
    'Polaris Bank': ['Polaris Bank'],
    'Ponto 24': ['Conta movel', 'Conta Movel', 'ContamovelBCI', 'Ponto 24', 'Ponto24'],
    'Pos deposit': ['Pos', 'POS', 'Pos deposit'],
    'Postal transfer': ['Egyptian postal transfers'],
    RIA: ['Ria', 'RIA'],
    'RTGS Bank': ['rtgs', 'RTGS', 'Rtgs bank transfer', 'RTGS transfers'],
    Safaricom: ['AbesafaricomMpesa Transfers', 'AbeSafaricomMpesaTransfers', 'safaricom mpesa'],
    'Sama Money': ['Sama money'],
    Skrill: ['Skill', 'Skril', 'skrill', 'SKRILL', 'skrillpayments', 'Skrll'],
    Smega: ['btc smega', 'smega', 'Smega'],
    'Stanbic Bank': [
        'Instant money stambic bank',
        'Instant money stanbic',
        'stanbic',
        'Stanbic',
        'Stanbic Bank',
        'StanbicBank',
        'Stanbic Bank Transfer',
        'Stanbic Money Transfer',
        'Standbic',
    ],
    'Standard Charted Bank': [
        'STANCHART',
        'Standard Charted Bank',
        'Standard chartered',
        'Standard chartered bank',
        'Standard Chartered Bank Transfer',
        'Standard Chatterd Bank',
    ],
    'T-pesa': ['M-Pesa Tigo-Pesa T-Pesa', 'Pesa', 'T-pesa', 'Tpesa', 'T PESA', 'TTCLpesa'],
    'Tigo Cash': ['Tigo', 'Tigo Cash'],
    'Tigo Mobile Money': ['Airtel Tigo', 'all mobile money', 'Tigo', 'TIGO MOBILE MONEY', 'TIGOMOBILEMONEY'],
    'Tigo Pesa': [
        'M-Pesa Tigo-Pesa T-Pesa',
        'Pesa',
        'Tigo',
        'tigopesa',
        'Tigo pesa',
        'Tigopesa',
        'Tigo Pesa',
        'TigoPesa',
        'TIGO PESA',
        'TTCLpesa',
    ],
    'Transferencia bancaria': ['Transferencia bancaria', 'Transferencia Eletronica TED', 'Transferencias bancarias'],
    'UBA Bank': ['UBA', 'UBA Bank', 'UBA BANK'],
    'Union Bank': ['Union Bank', 'Unionbank'],
    UPI: [
        'All UPI Transfer',
        'Banks BHIMUP BTC Ewallet GooglePay LocalBank Paypal Paytm Perfect Money PhonePhe',
        'upi',
        'UPI',
        'UPI transfer',
    ],
    'USSD code transfer': [
        'Or USSD transfer from all Nigeria banks',
        'USSD Code',
        'USSD CODE',
        'Ussd code Transfer from all Nigerian banks',
        'Ussd transfer',
        'USSD transfer',
    ],
    'Vodafone Cash': ['Vodafon Cash Methods', 'Vodafone cash', 'Vodafone Cash', 'VODAFONE CASH', 'VODAFONECASH'],
    Webmoney: ['Perfect Money and Webmoney', 'Webmoney', 'WebMoney'],
    WesternUnion: ['Western union', 'Western Union', 'WesternUnion'],
    'World Remit': ['World remit', 'World Remit'],
    'Zanaco bank': ['ZANACO', 'Zanaco bank'],
    'Zenith bank': ['Zenith bank', 'Zenithbank', 'Zenith Bank', 'ZenithBank', 'ZENITH BANK'],
    Zipit: ['Zipit', 'ZIPIT', 'ZIPIT bank transfers'],
};

export default { containers, map_action, icon_payment_methods, payment_methods };
