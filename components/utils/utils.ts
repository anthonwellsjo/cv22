export const GetVisibleTechAfterAdding = (previousTech: Tech[], categories: string[], allTech: Tech[]) => {
  let newTech = allTech.filter(t => {
    let getIt = false;
    t.techType.forEach(tt => {
      if (categories.includes(tt.techType)) getIt = true; return;
    })
    return getIt;
  })

  if (previousTech.length > 0) {
    newTech = newTech.filter(nt => {
      let keep = true;
      previousTech.forEach(t => {
        if (t.title === nt.title) keep = false; return;
      })
      return keep;
    })
  }
  return newTech;
}

export const FilterVisibleTechAfterRemoval = (previousTech: Tech[], categories: string[]) => {
  const leftTech = previousTech.filter(t => {
    let keep = false;
    t.techType.forEach(tt => {
      if (categories.includes(tt.techType)) keep = true; return;
    })
    return keep;
  });
  return leftTech;
}

export const scrollIsntCloseToAnyThreshold = (scroll: number, thresHolds: number[]) => {
  let answer = true;
  thresHolds.forEach(t => {
    
    if (Math.abs(scroll - t) < 0.1) answer = false; return;
  })
  return answer;
}

export const calculatePosition = (thresHold: number, maxNumber: number) => {
  return thresHold / maxNumber * 100;

}