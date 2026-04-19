type CommunityInfoState = {
  success: boolean
  message?: string
  errors?: {
    sessionId?: string[]
    githubEmail?: string[]
    githubUsername?: string[]
    twitterHandle?: string[]
    _form?: string[]
  }
}

export async function saveCommunityInfo(
  prevState: CommunityInfoState | null,
  formData: FormData
): Promise<CommunityInfoState> {
  void prevState
  void formData

  return {
    success: false,
    errors: {
      _form: ['Premium template purchases are disabled for FareFold.'],
    },
  }
}
