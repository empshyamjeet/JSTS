export interface AutomationPracticeFormData {
  address: string;
  countryLabel: string;
  countryValue: string;
  date: string;
  email: string;
  gender: 'male' | 'female';
  name: string;
  phone: string;
}

export const defaultAutomationPracticeFormData: AutomationPracticeFormData = {
  address: 'MG Road, Bengaluru',
  countryLabel: 'India',
  countryValue: 'india',
  date: '09/15/2025',
  email: 'test.user@example.com',
  gender: 'female',
  name: 'Test User',
  phone: '9876543210',
};

export function buildAutomationPracticeFormData(
  overrides: Partial<AutomationPracticeFormData> = {},
): AutomationPracticeFormData {
  // Tests can override only the fields they care about and keep the rest stable.
  return {
    ...defaultAutomationPracticeFormData,
    ...overrides,
  };
}

export const seleniumBookExpectation = {
  author: 'Amit',
  price: '300',
  title: 'Learn Selenium',
} as const;
