export default class SettingsModel {
    id?: string;
    depositFeePercent!: string;
    withdrawFeePercent!: string;
    maxDeposit!: string;
    minDeposit!: string;
    maxWithdraw!: string;
    minWithdraw!: string;
    depositAmountFeeFrom30to100!: string;
    depositAmountFeeFrom101to300!: string;
    depositAmountFeeFrom301to800!: string;
    depositAmountFeeFrom801to1500!: string;
    depositAmountFeeFrom1500plus!: string;
    depositAmountFeePercent!: string;
    depositFeeFixedAmount!: string;  
    withdrawAmountFeeFrom30to100!: string;
    withdrawAmountFeeFrom101to300!: string;
    withdrawAmountFeeFrom301to800!: string;
    withdrawAmountFeeFrom801to1500!: string;
    withdrawAmountFeeFrom1500plus!: string;
    withdrawAmountFeePercent!: string;
    withdrawFeeFixedAmount!: string;  
  }