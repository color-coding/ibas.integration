/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace sap {
    namespace byd {
        namespace managesalesorderin {
            type CroatiaPaymentMethodCode = CroatiaPaymentMethodCode_Content;

            type CroatiaPaymentMethodCode_Content = token;

            type GLOBusinessSpaceID = token;

            type HR_BillingMachineID = token;

            interface SalesOrderBundleMaintainConfirmation_sync extends SalesOrderMaintainConfirmationBundleMessage_sync {
            }

            interface SalesOrderBundleMaintainRequest_sync extends SalesOrderMaintainRequestBundleMessage_sync {
            }

            interface SalesOrderRequestBundleCheckMaintainQuery_sync extends SalesOrderMaintainRequestBundleMessage_sync {
            }

            interface SalesOrderRequestBundleCheckMaintainResponse_sync extends SalesOrderMaintainConfirmationBundleMessage_sync {
            }

            interface ExchangeFaultData {
                faultText: string;
                faultUrl?: string;
                faultDetail?: ExchangeLogData[];
            }

            interface ExchangeLogData {
                severity?: string;
                text: string;
                url?: string;
                id?: string;
            }

            interface HouseBankAccountKey {
                CompanyUUID?: UUID;
                InternalID: BankAccountInternalID;
            }

            type LEN120_LANGUAGEINDEPENDENT_Text = string;

            interface ProjectTaskKey {
                TaskID: ProjectElementID;
            }

            interface RequirementSpecificationKey {
                RequirementSpecificationID: RequirementSpecificationID;
                RequirementSpecificationVersionID?: VersionID;
            }

            interface StandardFaultMessageExtension {
                Log?: Log;
            }

            interface StandardFaultMessage {
            }

            interface SalesOrderMaintainConfirmationBundle {
                ChangeStateID: ChangeStateID;
                ReferenceObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                UUID: UUID;
                ID?: BusinessTransactionDocumentID;
            }

            interface SalesOrderMaintainConfirmationBundleMessage_sync {
                SalesOrder?: SalesOrderMaintainConfirmationBundle[];
                Log: Log;
            }

            interface SalesOrderMaintainRequest {
                ObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                ID?: BusinessTransactionDocumentID;
                BuyerID?: BusinessTransactionDocumentID;
                PostingDate?: GLOBAL_DateTime;
                Name?: EXTENDED_Name;
                UUID?: UUID;
                DataOriginTypeCode?: CustomerTransactionDocumentDataOriginTypeCode;
                FulfillmentBlockingReasonCode?: CustomerTransactionDocumentFulfilmentBlockingReasonCode;
                ReleaseCustomerRequest?: Indicator;
                ReleaseAllItemsToExecution?: Indicator;
                FinishFulfilmentProcessingOfAllItems?: Indicator;
                BusinessTransactionDocumentReference?: SalesOrderMaintainRequestBusinessTransactionDocumentReference[];
                SalesAndServiceBusinessArea?: SalesOrderMaintainRequestSalesAndServiceBusinessArea;
                BillToParty?: SalesOrderMaintainRequestPartyParty;
                AccountParty?: SalesOrderMaintainRequestPartyParty;
                PayerParty?: SalesOrderMaintainRequestPartyParty;
                ProductRecipientParty?: SalesOrderMaintainRequestPartyParty;
                SalesPartnerParty?: SalesOrderMaintainRequestPartyParty;
                FreightForwarderParty?: SalesOrderMaintainRequestPartyParty;
                EmployeeResponsibleParty?: SalesOrderMaintainRequestPartyIDParty;
                SellerParty?: SalesOrderMaintainRequestPartyIDParty;
                SalesUnitParty?: SalesOrderMaintainRequestPartyIDParty;
                ServiceExecutionTeamParty?: SalesOrderMaintainRequestPartyIDParty;
                ServicePerformerParty?: SalesOrderMaintainRequestPartyIDParty;
                SalesEmployeeParty?: SalesOrderMaintainRequestPartyIDParty;
                BillFromParty?: SalesOrderMaintainRequestPartyIDParty;
                RequestedFulfillmentPeriodPeriodTerms?: SalesOrderMaintainRequestRequestedFulfillmentPeriodPeriodTerms;
                DeliveryTerms?: SalesOrderMaintainRequestDeliveryTerms;
                PricingTerms?: SalesOrderMaintainRequestPricingTerms;
                SalesTerms?: SalesOrderMaintainRequestSalesTerms;
                InvoiceTerms?: SalesOrderMaintainRequestInvoiceTerms;
                Item?: SalesOrderMaintainRequestItem[];
                CashDiscountTerms?: SalesOrderMaintainRequestCashDiscountTerms;
                PaymentControl?: SalesOrderMaintainRequestPaymentControl;
                PriceAndTaxCalculation?: SalesOrderMaintainRequestPriceAndTaxCalculation;
                TextCollection?: SalesOrderMaintainRequestTextCollection;
                AttachmentFolder?: MaintenanceAttachmentFolder;
                ChangeStateID?: ChangeStateID;
                CroatiaBusinessSpaceID?: GLOBusinessSpaceID;
                CroatiaBillingMachineID?: HR_BillingMachineID;
                CroatiaPaymentMethodCode?: CroatiaPaymentMethodCode;
                CroatiaPartyTaxID?: PartyTaxID;
                CroatiaParagonBillMark?: LANGUAGEINDEPENDENT_Text;
                CroatiaSpecialNote?: LANGUAGEINDEPENDENT_Text;
                $itemListCompleteTransmissionIndicator?: Indicator;
                $businessTransactionDocumentReferenceListCompleteTransmissionIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestBundleMessage_sync {
                BasicMessageHeader: BusinessDocumentBasicMessageHeader;
                SalesOrder: SalesOrderMaintainRequest[];
            }

            interface SalesOrderMaintainRequestBusinessTransactionDocumentReference {
                BusinessTransactionDocumentReference: BusinessTransactionDocumentReference;
                BusinessTransactionDocumentRelationshipRoleCode?: BusinessTransactionDocumentRelationshipRoleCode;
                DataProviderIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestCashDiscountTerms {
                Code?: CashDiscountTermsCode;
                PaymentBaselineDate?: Date;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestDeliveryTerms {
                DeliveryPriorityCode?: PriorityCode;
                Incoterms?: Incoterms;
                PartialDeliveryControlCode?: PartialDeliveryControlCode;
                CompleteDeliveryRequestedIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestInvoiceTerms {
                ProposedInvoiceDate?: Date;
                InvoicingBlockingReasonCode?: InvoicingBlockingReasonCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestItem {
                ObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                ID?: BusinessTransactionDocumentItemID;
                BuyerID?: BusinessTransactionDocumentItemID;
                ProcessingTypeCode?: BusinessTransactionDocumentItemProcessingTypeCode;
                PostingDate?: GLOBAL_DateTime;
                Description?: SHORT_Description;
                FulfilmentPartyCategoryCode?: FulfilmentPartyCategoryCode;
                ReleaseToExecute?: Indicator;
                FinishFulfilmentProcessing?: Indicator;
                ItemBusinessTransactionDocumentReference?: SalesOrderMaintainRequestBusinessTransactionDocumentReference[];
                ItemProduct?: SalesOrderMaintainRequestItemProduct;
                ItemDeliveryTerms?: SalesOrderMaintainRequestItemDeliveryTerms;
                ItemSalesTerms?: SalesOrderMaintainRequestItemSalesTerms;
                ItemServiceTerms?: SalesOrderMaintainRequestItemServiceTerms;
                ItemScheduleLine?: SalesOrderMaintainRequestItemScheduleLine[];
                ProductRecipientItemParty?: SalesOrderMaintainRequestPartyParty;
                VendorItemParty?: SalesOrderMaintainRequestPartyIDParty;
                ServicePerformerItemParty?: SalesOrderMaintainRequestPartyIDParty;
                ShipFromItemLocation?: SalesOrderMaintainRequestItemLocation;
                ItemAccountingCodingBlockDistribution?: SalesOrderMaintainRequestItemAccountingCodingBlockDistribution;
                PriceAndTaxCalculationItem?: SalesOrderMaintainRequestPriceAndTaxCalculationItem;
                ItemTextCollection?: SalesOrderMaintainRequestTextCollection;
                ItemAttachmentFolder?: MaintenanceAttachmentFolder;
                $itemScheduleLineListCompleteTransmissionIndicator?: Indicator;
                $itemBusinessTransactionDocumentReferenceListCompleteTransmissionIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestItemAccountingCodingBlockDistribution {
                AccountingCodingBlockAssignment?: SalesOrderMaintainRequestItemAccountingCodingBlockDistributionAccountingCodingBlockAssignment;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestItemAccountingCodingBlockDistributionAccountingCodingBlockAssignment {
                ProjectTaskKey?: ProjectTaskKey;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestItemDeliveryTerms {
                DeliveryPriorityCode?: PriorityCode;
                Incoterms?: Incoterms;
                PartialDeliveryControlCode?: PartialDeliveryControlCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestItemLocation {
                LocationID?: LocationID;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestItemProduct {
                ProductID?: NOCONVERSION_ProductID;
                ProductInternalID?: ProductInternalID;
                ProductStandardID?: ProductStandardID;
                ProductBuyerID?: ProductPartyID;
                UnitOfMeasure?: MeasureUnitCode;
                ProductRequirementSpecificationKey?: RequirementSpecificationKey;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestItemSalesTerms {
                CancellationReasonCode?: CancellationReasonCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestItemScheduleLine {
                ObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                ID?: BusinessTransactionDocumentItemScheduleLineID;
                TypeCode?: BusinessTransactionDocumentItemScheduleLineTypeCode;
                Quantity?: Quantity;
                DateTimePeriod?: UPPEROPEN_LOCALNORMALISED_DateTimePeriod;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestItemServiceTerms {
                ConfirmationRelevanceIndicator?: Indicator;
                EmployeeTimeConfirmationRelevanceIndicator?: Indicator;
                ExpenseReportingConfirmationRelevanceIndicator?: Indicator;
                ServiceWorkingConditionsCode?: ServiceWorkingConditionsCode;
                ServicePlannedDuration?: Duration;
                ResourceID?: ResourceID;
                ProjectTaskID?: ProjectElementID;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPartyAddress {
                CorrespondenceLanguageCode?: LanguageCode;
                Email?: SalesOrderMaintainRequestPartyAddressEmail[];
                Facsimile?: SalesOrderMaintainRequestPartyAddressFascmile[];
                Telephone?: SalesOrderMaintainRequestPartyAddressTelephone[];
                Web?: SalesOrderMaintainRequestPartyAddressWeb[];
                DisplayName?: SalesOrderMaintainRequestPartyAddressDisplayName[];
                Name?: SalesOrderMaintainRequestPartyAddressName[];
                PostalAddress?: SalesOrderMaintainRequestPartyAddressPostalAddress[];
            }

            interface SalesOrderMaintainRequestPartyAddressDisplayName {
                FormattedName?: LONG_Name;
            }

            interface SalesOrderMaintainRequestPartyAddressEmail {
                URI?: EmailURI;
                DefaultIndicator?: Indicator;
                UsageDeniedIndicator?: Indicator;
            }

            interface SalesOrderMaintainRequestPartyAddressFascmile {
                Number?: PhoneNumber;
                FormattedNumberDescription?: LANGUAGEINDEPENDENT_SHORT_Description;
                DefaultIndicator?: Indicator;
                UsageDeniedIndicator?: Indicator;
            }

            interface SalesOrderMaintainRequestPartyAddressName {
                AddressRepresentationCode?: AddressRepresentationCode;
                Name?: OrganisationName;
            }

            interface SalesOrderMaintainRequestPartyAddressPostalAddress {
                AddressRepresentationCode?: AddressRepresentationCode;
                CountryCode?: CountryCode;
                RegionCode?: RegionCode;
                CountyName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                CityName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                AdditionalCityName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                DistrictName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                StreetPostalCode?: PostalCode;
                POBoxPostalCode?: PostalCode;
                CompanyPostalCode?: PostalCode;
                StreetPrefixName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                AdditionalStreetPrefixName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                StreetName?: StreetName;
                StreetSuffixName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                AdditionalStreetSuffixName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                HouseID?: HouseID;
                BuildingID?: BuildingID;
                RoomID?: RoomID;
                FloorID?: FloorID;
                CareOfName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                POBoxDeviatingCountryCode?: CountryCode;
                POBoxDeviatingRegionCode?: RegionCode;
                POBoxDeviatingCityName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                POBoxID?: POBoxID;
                POBoxIndicator?: Indicator;
                TaxJurisdictionCode?: TaxJurisdictionCode;
                TimeZoneCode?: TimeZoneCode;
            }

            interface SalesOrderMaintainRequestPartyAddressTelephone {
                Number?: PhoneNumber;
                FormattedNumberDescription?: LANGUAGEINDEPENDENT_SHORT_Description;
                DefaultConventionalPhoneNumberIndicator?: Indicator;
                DefaultMobilePhoneNumberIndicator?: Indicator;
                UsageDeniedIndicator?: Indicator;
                MobilePhoneNumberIndicator?: Indicator;
                SMSEnabledIndicator?: Indicator;
            }

            interface SalesOrderMaintainRequestPartyAddressWeb {
                URI?: WebURI;
                DefaultIndicator?: Indicator;
                UsageDeniedIndicator?: Indicator;
            }

            interface SalesOrderMaintainRequestPartyContactParty {
                ObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                PartyID?: PartyID;
                AddressHostUUID?: UUID;
                Address?: SalesOrderMaintainRequestPartyAddress;
                MainIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPartyIDParty {
                PartyID?: PartyID;
                ContactParty?: SalesOrderMaintainRequestPartyContactParty[];
                $partyContactPartyListCompleteTransmissionIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPartyParty {
                PartyID?: PartyID;
                AddressHostUUID?: UUID;
                Address?: SalesOrderMaintainRequestPartyAddress;
                ContactParty?: SalesOrderMaintainRequestPartyContactParty[];
                $partyContactPartyListCompleteTransmissionIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPaymentControl {
                PaymentProcessingCompanyUUID?: UUID;
                PaymentProcessingCompanyID?: OrganisationalCentreID;
                PaymentProcessingBusinessPartnerUUID?: UUID;
                PaymentProcessingBusinessPartnerID?: BusinessPartnerInternalID;
                ResponsibleEmployeeUUID?: UUID;
                ResponsibleEmployeeID?: BusinessPartnerInternalID;
                PropertyMovementDirectionCode?: PropertyMovementDirectionCode;
                PaymentFormCode?: PaymentFormCode;
                PaymentAmount?: Amount;
                ExchangeRate?: ExchangeRate;
                PaymentBlock?: PaymentBlock;
                FirstPaymentInstructionTypeCode?: PaymentInstructionTypeCode;
                SecondPaymentInstructionTypeCode?: PaymentInstructionTypeCode;
                ThirdPaymentInstructionTypeCode?: PaymentInstructionTypeCode;
                FourthPaymentInstructionTypeCode?: PaymentInstructionTypeCode;
                BankChargeBearerCode?: BankChargeBearerCode;
                PaymentPriorityCode?: PriorityCode;
                SinglePaymentIndicator?: Indicator;
                DebitValueDate?: Date;
                CreditValueDate?: Date;
                PaymentReceivablesPayablesGroupID?: BusinessTransactionDocumentGroupID;
                PaymentReferenceID?: PaymentReferenceID;
                PaymentReferenceTypeCode?: PaymentReferenceTypeCode;
                Note?: MEDIUM_Note;
                ExternalPayment?: SalesOrderMaintainRequestPaymentControlExternalPayment[];
                CreditCardPayment?: SalesOrderMaintainRequestPaymentControlCreditCardPayment[];
                $actionCode?: ActionCode;
                $externalPaymentListCompleteTransmissionIndicator?: Indicator;
                $creditCardPaymentListCompleteTransmissionIndicator?: Indicator;
            }

            interface SalesOrderMaintainRequestPaymentControlCreditCardPayment {
                UUID?: UUID;
                PaymentCardUUID?: UUID;
                PaymentCardKey?: PaymentCardKey;
                BusinessPartnerPaymentCardDetailsKeyID?: BusinessPartnerPaymentCardDetailsID;
                PaymentCardDataOriginTypeCode?: DataOriginTypeCode;
                PaymentCardAutomaticallyGeneratedIndicator?: Indicator;
                DeviceID?: DeviceID;
                LocationInternalID?: LocationInternalID;
                ClearingHouseAccountUUID?: UUID;
                ClearingHouseAccountKeyID?: ClearingHouseAccountID;
                PaymentCardVerificationValueText?: PaymentCardVerificationValueText;
                PaymentCardVerificationValueAvailabilityCode?: PaymentCardVerificationValueAvailabilityCode;
                PaymentCardVerificationValueCheckRequiredIndicator?: Indicator;
                AuthorisationRequiredIndicator?: Indicator;
                AuthorisationLimitAmount?: Amount;
                AuthorisationValueUnlimitedIndicator?: Indicator;
                Amount?: Amount;
                PaymentAuthorisedAmount?: Amount;
                CompanyClearingHouseID?: PartyPartyID;
                CreditCardPaymentAuthorisation?: SalesOrderMaintainRequestPaymentControlCreditCardPaymentCreditCardPaymentAuthorisation[];
                $creditCardPaymentAuthorisationListCompleteTransmissionIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPaymentControlCreditCardPaymentCreditCardPaymentAuthorisation {
                UUID?: UUID;
                ID?: PaymentCardPaymentAuthorisationPartyID_V1;
                ClearingHouseID?: PaymentCardPaymentAuthorisationPartyID_V1;
                ProviderID?: PaymentCardPaymentAuthorisationPartyID_V1;
                PaymentCardHolderAuthenticationID?: PaymentCardHolderAuthenticationID;
                PaymentCardHolderAuthenticationResultCode?: PaymentCardHolderAuthenticationResultCode;
                PaymentCardHolderAuthenticationTokenText?: PaymentCardHolderAuthenticationTokenText;
                DateTime?: GLOBAL_DateTime;
                PaymentCardTransactionTypeCode?: PaymentCardTransactionTypeCode;
                PreAuthorisationIndicator?: Indicator;
                Amount?: Amount;
                ExpirationDateTime?: GLOBAL_DateTime;
                ActiveIndicator?: Indicator;
                AppliedIndicator?: Indicator;
                ResultCode?: AuthorisationResultCode;
                PaymentCardAddressVerificationResultCode?: PaymentCardAddressVerificationResultCode;
                ProductRecipientPartyPaymentCardAddressVerificationResultCode?: PaymentCardAddressVerificationResultCode;
                PaymentCardVerificationResultCode?: PaymentCardVerificationResultCode;
                PaymentCardVerificationValueVerificationResultCode?: PaymentCardVerificationValueVerificationResultCode;
                ResultDescription?: SHORT_Description;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPaymentControlExternalPayment {
                UUID?: UUID;
                HouseBankAccountUUID?: UUID;
                HouseBankAccountKeyInternalID?: BankAccountInternalID;
                PaymentTransactionReferenceID?: PaymentTransactionReferenceID;
                DocumentDate?: Date;
                ValueDate?: Date;
                Amount?: Amount;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculation {
                MainDiscount?: SalesOrderMaintainRequestPriceAndTaxCalculationMainDiscount;
                PriceComponent?: SalesOrderMaintainRequestPriceAndTaxCalculationPriceComponent[];
                ProductTaxDetails?: SalesOrderMaintainRequestPriceAndTaxCalculationProductTaxDetails[];
                TaxationTerms?: SalesOrderMaintainRequestPriceAndTaxCalculationTaxationTerms;
                WithholdingTaxDetails?: SalesOrderMaintainRequestPriceAndTaxCalculationWithholdingTaxDetails[];
                $priceComponentListCompleteTransmissionIndicator?: Indicator;
                $productTaxDetailsListCompleteTransmissionIndicator?: Indicator;
                $withholdingTaxDetailsListCompleteTransmissionIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationItem {
                CountryCode?: CountryCode;
                TaxationCharacteristicsCode?: ProductTaxationCharacteristicsCode;
                TaxJurisdictionCode?: TaxJurisdictionCode;
                WithholdingTaxationCharacteristicsCode?: WithholdingTaxationCharacteristicsCode;
                ItemMainDiscount?: SalesOrderMaintainRequestPriceAndTaxCalculationItemItemMainDiscount;
                ItemMainPrice?: SalesOrderMaintainRequestPriceAndTaxCalculationItemItemMainPrice;
                ItemPriceComponent?: SalesOrderMaintainRequestPriceAndTaxCalculationItemItemPriceComponent[];
                ItemProductTaxDetails?: SalesOrderMaintainRequestPriceAndTaxCalculationItemItemProductTaxDetails[];
                ItemTaxationTerms?: SalesOrderMaintainRequestPriceAndTaxCalculationItemItemTaxationTerms;
                ItemWithholdingTaxDetails?: SalesOrderMaintainRequestPriceAndTaxCalculationItemItemWithholdingTaxDetails[];
                $itemPriceComponentListCompleteTransmissionIndicator?: Indicator;
                $itemProductTaxDetailsListCompleteTransmissionIndicator?: Indicator;
                $itemWithholdingTaxDetailsListCompleteTransmissionIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationItemItemMainDiscount {
                Description?: SHORT_Description;
                Rate?: Rate;
                RateBaseQuantityTypeCode?: QuantityTypeCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationItemItemMainPrice {
                Description?: SHORT_Description;
                Rate?: Rate;
                RateBaseQuantityTypeCode?: QuantityTypeCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationItemItemPriceComponent {
                ObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                UUID?: UUID;
                TypeCode?: PriceSpecificationElementTypeCode;
                Description?: SHORT_Description;
                Rate?: Rate;
                RateBaseQuantityTypeCode?: QuantityTypeCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationItemItemProductTaxDetails {
                UUID?: UUID;
                TransactionCurrencyProductTax?: ProductTax;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationItemItemTaxationTerms {
                SellerCountryCode?: CountryCode;
                SellerTaxID?: PartyTaxID;
                SellerTaxIdentificationNumberTypeCode?: TaxIdentificationNumberTypeCode;
                BuyerCountryCode?: CountryCode;
                BuyerTaxID?: PartyTaxID;
                BuyerTaxIdentificationNumberTypeCode?: TaxIdentificationNumberTypeCode;
                EuropeanCommunityVATTriangulationIndicator?: Indicator;
                TaxDate?: Date;
                TaxDueDate?: Date;
                TaxExemptionCertificateID?: TaxExemptionCertificateID;
                TaxExemptionReasonCode?: TaxExemptionReasonCode;
                TaxExemptionReasonCodeRelevanceIndicator?: Indicator;
                FollowUpTaxExemptionCertificateID?: TaxExemptionCertificateID;
                ProductTaxStandardClassificationCode?: ProductTaxStandardClassificationCode;
                ProductTaxStandardClassificationSystemCode?: ProductTaxStandardClassificationSystemCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationItemItemWithholdingTaxDetails {
                UUID?: UUID;
                WithholdingTax?: WithholdingTax;
                TransactionCurrencyWithholdingTax?: WithholdingTax;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationMainDiscount {
                Rate?: Rate;
                RateBaseQuantityTypeCode?: QuantityTypeCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationPriceComponent {
                ObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                UUID?: UUID;
                TypeCode?: PriceSpecificationElementTypeCode;
                Rate?: Rate;
                RateBaseQuantityTypeCode?: QuantityTypeCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationProductTaxDetails {
                UUID?: UUID;
                TaxationCharacteristicsCode?: ProductTaxationCharacteristicsCode;
                TransactionCurrencyProductTax?: ProductTax;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationTaxationTerms {
                SellerCountryCode?: CountryCode;
                SellerTaxID?: PartyTaxID;
                SellerTaxIdentificationNumberTypeCode?: TaxIdentificationNumberTypeCode;
                BuyerCountryCode?: CountryCode;
                BuyerTaxID?: PartyTaxID;
                BuyerTaxIdentificationNumberTypeCode?: TaxIdentificationNumberTypeCode;
                EuropeanCommunityVATTriangulationIndicator?: Indicator;
                TaxDate?: Date;
                TaxDueDate?: Date;
                TaxExemptionCertificateID?: TaxExemptionCertificateID;
                TaxExemptionReasonCode?: TaxExemptionReasonCode;
                TaxExemptionReasonCodeRelevanceIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPriceAndTaxCalculationWithholdingTaxDetails {
                UUID?: UUID;
                WithholdingTax?: WithholdingTax;
                TransactionCurrencyWithholdingTax?: WithholdingTax;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestPricingTerms {
                CurrencyCode?: CurrencyCode;
                PriceDateTime?: LOCALNORMALISED_DateTime;
                GrossAmountIndicator: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestRequestedFulfillmentPeriodPeriodTerms {
                StartDateTime?: LOCALNORMALISED_DateTime;
                EndDateTime?: LOCALNORMALISED_DateTime;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestSalesAndServiceBusinessArea {
                DistributionChannelCode?: DistributionChannelCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestSalesTerms {
                CancellationReasonCode?: CancellationReasonCode;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestTextCollection {
                Text?: SalesOrderMaintainRequestTextCollectionText[];
                $textListCompleteTransmissionIndicator?: Indicator;
                $actionCode?: ActionCode;
            }

            interface SalesOrderMaintainRequestTextCollectionText {
                ObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                TypeCode: TextCollectionTextTypeCode;
                CreationDateTime?: GLOBAL_DateTime;
                ContentText: LANGUAGEINDEPENDENT_Text;
                $actionCode?: ActionCode;
            }

            type ActionCode = "01" | "02" | "03" | "04" | "05" | "06";

            type AddressRepresentationCode = AddressRepresentationCode_Content;

            type AddressRepresentationCode_Content = token;

            type AgencyIdentificationCode = token;

            type Amount = Amount_Content;

            type Amount_Content = decimal;

            type AuthorisationResultCode = token;

            type BankAccountInternalID = BankAccountInternalID_Content;

            type BankAccountInternalID_Content = token;

            type BankChargeBearerCode = token;

            type BuildingID = token;

            interface BusinessDocumentBasicMessageHeader {
                ID?: BusinessDocumentMessageID;
                UUID?: UUID;
                ReferenceID?: BusinessDocumentMessageID;
                ReferenceUUID?: UUID;
            }

            type BusinessDocumentMessageID = BusinessDocumentMessageID_Content;

            type BusinessDocumentMessageID_Content = token;

            type BusinessPartnerInternalID = token;

            type BusinessPartnerPaymentCardDetailsID = token;

            type BusinessTransactionDocumentGroupID = token;

            type BusinessTransactionDocumentID = BusinessTransactionDocumentID_Content;

            type BusinessTransactionDocumentID_Content = token;

            type BusinessTransactionDocumentItemGroupID = token;

            type BusinessTransactionDocumentItemID = token;

            type BusinessTransactionDocumentItemProcessingTypeCode = token;

            type BusinessTransactionDocumentItemScheduleLineID = token;

            type BusinessTransactionDocumentItemScheduleLineTypeCode = token;

            type BusinessTransactionDocumentItemTypeCode = token;

            interface BusinessTransactionDocumentReference {
                ID: BusinessTransactionDocumentID;
                UUID?: UUID;
                TypeCode?: BusinessTransactionDocumentTypeCode;
                ItemID?: BusinessTransactionDocumentItemID;
                ItemUUID?: UUID;
                ItemTypeCode?: BusinessTransactionDocumentItemTypeCode;
            }

            type BusinessTransactionDocumentRelationshipRoleCode = token;

            type BusinessTransactionDocumentTypeCode = BusinessTransactionDocumentTypeCode_Content;

            type BusinessTransactionDocumentTypeCode_Content = token;

            type CancellationReasonCode = CancellationReasonCode_Content;

            type CancellationReasonCode_Content = token;

            type CashDiscountTermsCode = CashDiscountTermsCode_Content;

            type CashDiscountTermsCode_Content = token;

            type ChangeStateID = token;

            type ClearingHouseAccountID = ClearingHouseAccountID_Content;

            type ClearingHouseAccountID_Content = token;

            type CountryCode = token;

            type CountryDiallingCode = token;

            type CurrencyCode = token;

            type CustomerTransactionDocumentDataOriginTypeCode = token;

            type CustomerTransactionDocumentFulfilmentBlockingReasonCode = token;

            type DataOriginTypeCode = DataOriginTypeCode_Content;

            type DataOriginTypeCode_Content = token;

            interface DatePeriod {
                StartDate?: Date;
                EndDate?: Date;
                Duration?: Duration;
            }

            type DecimalValue = decimal;

            type Description = string;

            type DeviceID = DeviceID_Content;

            type DeviceID_Content = token;

            type DistributionChannelCode = DistributionChannelCode_Content;

            type DistributionChannelCode_Content = token;

            type DocumentCategoryCode = token;

            type DocumentTypeCode = DocumentTypeCode_Content;

            type DocumentTypeCode_Content = token;

            type DueCategoryCode = token;

            type Duration = duration;

            type EXTENDED_Name = EXTENDED_Name_Content;

            type EXTENDED_Name_Content = string;

            type EmailURI = anyURI;

            interface ExchangeRate {
                UnitCurrency: CurrencyCode;
                QuotedCurrency: CurrencyCode;
                Rate: ExchangeRateRate;
                QuotationDateTime?: GLOBAL_DateTime;
            }

            type ExchangeRateRate = decimal;

            type FloorID = token;

            type FormOfAddressCode = FormOfAddressCode_Content;

            type FormOfAddressCode_Content = token;

            type FulfilmentPartyCategoryCode = FulfilmentPartyCategoryCode_Content;

            type FulfilmentPartyCategoryCode_Content = token;

            type HouseID = token;

            interface Incoterms {
                ClassificationCode: IncotermsClassificationCode;
                TransferLocationName?: IncotermsTransferLocationName;
            }

            type IncotermsClassificationCode = token;

            type IncotermsTransferLocationName = string;

            type Indicator = boolean;

            type IntegerValue = int;

            type InvoicingBlockingReasonCode = token;

            type LANGUAGEINDEPENDENT_MEDIUM_Name = string;

            type LANGUAGEINDEPENDENT_Name = string;

            type LANGUAGEINDEPENDENT_SHORT_Description = string;

            type LANGUAGEINDEPENDENT_Text = string;

            type LOCALNORMALISED_DateTime = LOCALNORMALISED_DateTime_Content;

            type LOCALNORMALISED_DateTime_Content = dateTime;

            type LONG_Name = LONG_Name_Content;

            type LONG_Name_Content = string;

            type LegallyRequiredPhraseText = string;

            type LocationID = LocationID_Content;

            type LocationID_Content = token;

            type LocationInternalID = LocationInternalID_Content;

            type LocationInternalID_Content = token;

            interface Log {
                BusinessDocumentProcessingResultCode?: ProcessingResultCode;
                MaximumLogItemSeverityCode?: LogItemSeverityCode;
                Item?: LogItem[];
            }

            interface LogItem {
                TypeID?: LogItemTypeID;
                CategoryCode?: LogItemCategoryCode;
                SeverityCode?: LogItemSeverityCode;
                ReferenceObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                ReferenceMessageElementName?: LANGUAGEINDEPENDENT_Name;
                Note: LogItemNote;
                NoteTemplateText?: LogItemNoteTemplateText;
                LogItemNotePlaceholderSubstitutionList?: LogItemNotePlaceholderSubstitutionList;
                WebURI?: WebURI;
            }

            type LogItemCategoryCode = LogItemCategoryCode_Content;

            type LogItemCategoryCode_Content = token;

            type LogItemNote = string;

            interface LogItemNotePlaceholderSubstitutionList {
                FirstPlaceholderID: LogItemTemplatePlaceholderID;
                SecondPlaceholderID?: LogItemTemplatePlaceholderID;
                ThirdPlaceholderID?: LogItemTemplatePlaceholderID;
                FourthPlaceholderID?: LogItemTemplatePlaceholderID;
                FirstPlaceholderSubstitutionText: LogItemPlaceholderSubstitutionText;
                SecondPlaceholderSubstitutionText?: LogItemPlaceholderSubstitutionText;
                ThirdPlaceholderSubstitutionText?: LogItemPlaceholderSubstitutionText;
                FourthPlaceholderSubstitutionText?: LogItemPlaceholderSubstitutionText;
            }

            type LogItemNoteTemplateText = string;

            type LogItemPlaceholderSubstitutionText = string;

            type LogItemSeverityCode = token;

            type LogItemTemplatePlaceholderID = token;

            type LogItemTypeID = token;

            type MEDIUM_Name = MEDIUM_Name_Content;

            type MEDIUM_Name_Content = string;

            type MEDIUM_Note = MEDIUM_Note_Content;

            type MEDIUM_Note_Content = string;

            type MIMECode = token;

            type MeasureUnitCode = token;

            type NOCONVERSION_ProductID = NOCONVERSION_ProductID_Content;

            type NOCONVERSION_ProductID_Content = token;

            type NamespaceURI = anyURI;

            type ObjectNodePartyTechnicalID = token;

            type ObjectNodeTechnicalID = token;

            interface OrganisationName {
                FormOfAddressCode?: FormOfAddressCode;
                FirstLineName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                SecondLineName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                ThirdLineName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                FourthLineName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
            }

            type OrganisationalCentreID = token;

            type POBoxID = token;

            type PartialDeliveryControlCode = token;

            type PartyID = PartyID_Content;

            type PartyID_Content = token;

            type PartyPartyID = token;

            type PartyTaxID = PartyTaxID_Content;

            type PartyTaxID_Content = token;

            interface PaymentBlock {
                PaymentBlockingReasonCode?: PaymentBlockingReasonCode;
                ExpirationDateTime: GLOBAL_DateTime;
                CreationIdentityUUID?: UUID;
                CreationDateTime?: GLOBAL_DateTime;
            }

            type PaymentBlockingReasonCode = PaymentBlockingReasonCode_Content;

            type PaymentBlockingReasonCode_Content = token;

            type PaymentCardAddressVerificationResultCode = token;

            type PaymentCardHolderAuthenticationID = PaymentCardHolderAuthenticationID_Content;

            type PaymentCardHolderAuthenticationID_Content = token;

            type PaymentCardHolderAuthenticationResultCode = PaymentCardHolderAuthenticationResultCode_Content;

            type PaymentCardHolderAuthenticationResultCode_Content = token;

            type PaymentCardHolderAuthenticationTokenText = string;

            type PaymentCardID = PaymentCardID_Content;

            type PaymentCardID_Content = token;

            type PaymentCardPaymentAuthorisationPartyID_V1 = PaymentCardPaymentAuthorisationPartyID_V1_Content;

            type PaymentCardPaymentAuthorisationPartyID_V1_Content = token;

            type PaymentCardTransactionTypeCode = token;

            type PaymentCardTypeCode = PaymentCardTypeCode_Content;

            type PaymentCardTypeCode_Content = token;

            type PaymentCardVerificationResultCode = token;

            type PaymentCardVerificationValueAvailabilityCode = PaymentCardVerificationValueAvailabilityCode_Content;

            type PaymentCardVerificationValueAvailabilityCode_Content = token;

            type PaymentCardVerificationValueText = string;

            type PaymentCardVerificationValueVerificationResultCode = token;

            type PaymentFormCode = token;

            type PaymentInstructionTypeCode = token;

            type PaymentReferenceID = token;

            type PaymentReferenceTypeCode = token;

            type PaymentServiceCustomerID = token;

            type PaymentServiceSubscriberID = token;

            type PaymentTransactionReferenceID = token;

            type Percent = decimal;

            interface PhoneNumber {
                AreaID?: PhoneNumberAreaID;
                SubscriberID?: PhoneNumberSubscriberID;
                ExtensionID?: PhoneNumberExtensionID;
                CountryCode?: CountryCode;
                CountryDiallingCode?: CountryDiallingCode;
                CountryName?: MEDIUM_Name;
            }

            type PhoneNumberAreaID = token;

            type PhoneNumberExtensionID = token;

            type PhoneNumberSubscriberID = token;

            type PostalCode = token;

            type PriceSpecificationElementTypeCode = PriceSpecificationElementTypeCode_Content;

            type PriceSpecificationElementTypeCode_Content = token;

            type PriorityCode = token;

            type ProcessingResultCode = token;

            type ProductInternalID = ProductInternalID_Content;

            type ProductInternalID_Content = token;

            type ProductPartyID = token;

            type ProductStandardID = ProductStandardID_Content;

            type ProductStandardID_Content = token;

            interface ProductTax {
                CountryCode?: CountryCode;
                RegionCode?: RegionCode;
                JurisdictionCode?: TaxJurisdictionCode;
                JurisdictionSubdivisionCode?: TaxJurisdictionSubdivisionCode;
                JurisdictionSubdivisionTypeCode?: TaxJurisdictionSubdivisionTypeCode;
                EventTypeCode?: ProductTaxEventTypeCode;
                TypeCode?: TaxTypeCode;
                RateTypeCode?: TaxRateTypeCode;
                CurrencyCode?: CurrencyCode;
                BaseAmount?: Amount;
                Percent?: Percent;
                BaseQuantity?: Quantity;
                BaseQuantityTypeCode?: QuantityTypeCode;
                Rate?: Rate;
                Amount?: Amount;
                InternalAmount?: Amount;
                NonDeductiblePercent?: Percent;
                NonDeductibleAmount?: Amount;
                DeductibleAmount?: Amount;
                DeductibilityCode?: TaxDeductibilityCode;
                BusinessTransactionDocumentItemGroupID?: BusinessTransactionDocumentItemGroupID;
                EuropeanCommunityVATTriangulationIndicator?: Indicator;
                DueCategoryCode?: DueCategoryCode;
                StatisticRelevanceIndicator?: Indicator;
                DeferredIndicator?: Indicator;
                Exemption?: TaxExemption;
                FollowUpExemption?: TaxExemption;
                LegallyRequiredPhrase?: LegallyRequiredPhraseText;
                ExchangeRate?: ExchangeRate;
            }

            type ProductTaxEventTypeCode = ProductTaxEventTypeCode_Content;

            type ProductTaxEventTypeCode_Content = token;

            type ProductTaxStandardClassificationCode = ProductTaxStandardClassificationCode_Content;

            type ProductTaxStandardClassificationCode_Content = token;

            type ProductTaxStandardClassificationSystemCode = ProductTaxStandardClassificationSystemCode_Content;

            type ProductTaxStandardClassificationSystemCode_Content = token;

            type ProductTaxationCharacteristicsCode = ProductTaxationCharacteristicsCode_Content;

            type ProductTaxationCharacteristicsCode_Content = token;

            type ProjectElementID = ProjectElementID_Content;

            type ProjectElementID_Content = token;

            type PropertyDataTypeFormatCode = token;

            type PropertyMovementDirectionCode = token;

            type Quantity = Quantity_Content;

            type Quantity_Content = decimal;

            type QuantityTypeCode = QuantityTypeCode_Content;

            type QuantityTypeCode_Content = token;

            interface Rate {
                DecimalValue: DecimalValue;
                MeasureUnitCode?: MeasureUnitCode;
                CurrencyCode?: CurrencyCode;
                BaseDecimalValue?: DecimalValue;
                BaseMeasureUnitCode?: MeasureUnitCode;
                BaseCurrencyCode?: CurrencyCode;
            }

            type RegionCode = RegionCode_Content;

            type RegionCode_Content = token;

            type RequirementSpecificationID = RequirementSpecificationID_Content;

            type RequirementSpecificationID_Content = token;

            type ResourceID = ResourceID_Content;

            type ResourceID_Content = token;

            type RoomID = token;

            type SHORT_Description = SHORT_Description_Content;

            type SHORT_Description_Content = string;

            type ServiceWorkingConditionsCode = ServiceWorkingConditionsCode_Content;

            type ServiceWorkingConditionsCode_Content = token;

            type StreetName = string;

            type TaxDeductibilityCode = TaxDeductibilityCode_Content;

            type TaxDeductibilityCode_Content = token;

            interface TaxExemption {
                CertificateID: TaxExemptionCertificateID;
                InternalCertificateID?: TaxExemptionCertificateID;
                ValidityPeriod?: DatePeriod;
                Percent?: Percent;
                Amount?: Amount;
                ReasonCode?: TaxExemptionReasonCode;
            }

            type TaxExemptionCertificateID = TaxExemptionCertificateID_Content;

            type TaxExemptionCertificateID_Content = token;

            type TaxExemptionReasonCode = TaxExemptionReasonCode_Content;

            type TaxExemptionReasonCode_Content = token;

            type TaxIdentificationNumberTypeCode = TaxIdentificationNumberTypeCode_Content;

            type TaxIdentificationNumberTypeCode_Content = token;

            type TaxJurisdictionCode = TaxJurisdictionCode_Content;

            type TaxJurisdictionCode_Content = token;

            type TaxJurisdictionSubdivisionCode = TaxJurisdictionSubdivisionCode_Content;

            type TaxJurisdictionSubdivisionCode_Content = token;

            type TaxJurisdictionSubdivisionTypeCode = TaxJurisdictionSubdivisionTypeCode_Content;

            type TaxJurisdictionSubdivisionTypeCode_Content = token;

            type TaxRateTypeCode = TaxRateTypeCode_Content;

            type TaxRateTypeCode_Content = token;

            type TaxTypeCode = TaxTypeCode_Content;

            type TaxTypeCode_Content = token;

            type TextCollectionTextTypeCode = TextCollectionTextTypeCode_Content;

            type TextCollectionTextTypeCode_Content = token;

            type TimeZoneCode = token;

            interface UPPEROPEN_LOCALNORMALISED_DateTimePeriod {
                StartDateTime?: LOCALNORMALISED_DateTime;
                EndDateTime?: LOCALNORMALISED_DateTime;
            }

            type UUID = UUID_Content;

            type UUID_Content = token;

            type VersionID = token;

            type WebURI = anyURI;

            interface WithholdingTax {
                CountryCode?: CountryCode;
                RegionCode?: RegionCode;
                EventTypeCode?: WithholdingTaxEventTypeCode;
                TypeCode?: TaxTypeCode;
                RateTypeCode?: TaxRateTypeCode;
                CurrencyCode?: CurrencyCode;
                BaseAmount: Amount;
                Percent?: Percent;
                Amount?: Amount;
                ExcludedAmount?: Amount;
                BusinessTransactionDocumentItemGroupID?: BusinessTransactionDocumentItemGroupID;
                StatisticRelevanceIndicator?: Indicator;
                PlannedIndicator?: Indicator;
                ExchangeRate?: ExchangeRate;
                IncomeTypeCode?: WithholdingTaxIncomeTypeCode;
            }

            type WithholdingTaxEventTypeCode = WithholdingTaxEventTypeCode_Content;

            type WithholdingTaxEventTypeCode_Content = token;

            type WithholdingTaxIncomeTypeCode = WithholdingTaxIncomeTypeCode_Content;

            type WithholdingTaxIncomeTypeCode_Content = token;

            type WithholdingTaxationCharacteristicsCode = WithholdingTaxationCharacteristicsCode_Content;

            type WithholdingTaxationCharacteristicsCode_Content = token;

            type BinaryObject = base64Binary;

            type CharacterSetCode = token;

            type GLOBAL_DateTime = dateTime;

            type LanguageCode = language;

            interface MaintenanceAttachmentFolder {
                UUID?: UUID;
                Document?: MaintenanceAttachmentFolderDocument[];
                $DocumentListCompleteTransmissionIndicator?: Indicator;
                $ActionCode?: ActionCode;
            }

            interface MaintenanceAttachmentFolderDocument {
                UUID?: UUID;
                LinkInternalIndicator?: Indicator;
                VisibleIndicator?: Indicator;
                CategoryCode?: DocumentCategoryCode;
                TypeCode?: DocumentTypeCode;
                MIMECode?: MIMECode;
                Name?: LANGUAGEINDEPENDENT_Name;
                AlternativeName?: LANGUAGEINDEPENDENT_Name;
                InternalLinkUUID?: UUID;
                Description?: Description;
                ExternalLinkWebURI?: WebURI;
                Property?: MaintenanceAttachmentFolderDocumentProperty[];
                FileContent?: MaintenanceAttachmentFolderDocumentFileContent;
                $PropertyListCompleteTransmissionIndicator?: Indicator;
                $ActionCode?: ActionCode;
            }

            interface MaintenanceAttachmentFolderDocumentFileContent {
                TechnicalID?: ObjectNodeTechnicalID;
                BinaryObject?: BinaryObject;
                $ActionCode?: ActionCode;
            }

            interface MaintenanceAttachmentFolderDocumentProperty {
                TechnicalID?: ObjectNodeTechnicalID;
                Name?: LANGUAGEINDEPENDENT_Name;
                DataTypeFormatCode?: PropertyDataTypeFormatCode;
                VisibleIndicator?: Indicator;
                ChangeAllowedIndicator?: Indicator;
                MultipleValueIndicator?: Indicator;
                NamespaceURI?: NamespaceURI;
                Description?: Description;
                PropertyValue?: MaintenanceAttachmentFolderDocumentPropertyPropertyValue[];
                $PropertyValueListCompleteTransmissionIndicator?: Indicator;
                $ActionCode?: ActionCode;
            }

            interface MaintenanceAttachmentFolderDocumentPropertyPropertyValue {
                TechnicalID?: ObjectNodeTechnicalID;
                Text?: LANGUAGEINDEPENDENT_Text;
                Indicator?: Indicator;
                DateTime?: GLOBAL_DateTime;
                IntegerValue?: IntegerValue;
                $ActionCode?: ActionCode;
            }

            interface PaymentCardKey {
                ID: PaymentCardID;
                TypeCode: PaymentCardTypeCode;
            }

            interface ServiceClient {
                CheckMaintainBundle(input: SalesOrderRequestBundleCheckMaintainQuery_sync, completed: (output: SalesOrderRequestBundleCheckMaintainResponse_sync, fault: StandardFaultMessage) => void): void;
                MaintainBundle(input: SalesOrderBundleMaintainRequest_sync, completed: (output: SalesOrderBundleMaintainConfirmation_sync, fault: StandardFaultMessage) => void): void;
            }

            type token = string;

            type dateTime = Date;

            type date = Date;

            type time = Date;

            type int = number;

            type decimal = number;

            type float = number;

            type language = string;

            type anyURI = any;

            type duration = any;

            type base64Binary = any;

        }
    }
}
