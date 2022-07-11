import React, { useState } from 'react'

export const useShowHide = (show) => {
    if (show) {
      return 'hide'
    } else if (!show) {
      return 'show'
    }
}
