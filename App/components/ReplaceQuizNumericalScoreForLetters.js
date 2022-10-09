 replaceQuizNumericalScoreForLetters = (
    personalityTypeForEitherPartnerOrMe,
    extraversionScore,
    opennessScore,
    agreeableScore,
    conscientiousScore,
    neuroticScore
  ) => {
    if (extraversionScore > 2.5) {
      personalityTypeForEitherPartnerOrMe += "E";
    } else {
      personalityTypeForEitherPartnerOrMe += "I";
    }
  
    if (opennessScore > 2.5) {
      personalityTypeForEitherPartnerOrMe += "N";
    } else {
      personalityTypeForEitherPartnerOrMe += "S";
    }
  
    if (agreeableScore > 2.5) {
      personalityTypeForEitherPartnerOrMe += "F";
    } else {
      personalityTypeForEitherPartnerOrMe += "T";
    }
  
    if (conscientiousScore > 2.5) {
      personalityTypeForEitherPartnerOrMe += "J";
    } else {
      personalityTypeForEitherPartnerOrMe += "P";
    }
  
    if (neuroticScore > 2.5) {
      personalityTypeForEitherPartnerOrMe += "LN";
    } else {
      personalityTypeForEitherPartnerOrMe += "N";
    }
  }