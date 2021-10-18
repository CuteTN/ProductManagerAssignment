using System;
using System.Linq;

namespace ProductManager.Shared.Utils 
{
  public static class HelperFuncs
  {
    static public bool CheckNameContainAllWords(string name, string queryStr)
    {
      if (queryStr == null)
        return true;

      var words = queryStr.ToUpper().Split(' ', StringSplitOptions.RemoveEmptyEntries);
      return words.Any(word => name.ToUpper().IndexOf(word) >= 0);
    }

    static public bool CheckValueInBetween<TValue>(
      TValue value, 
      Func<TValue, TValue, bool> isLessThanOrEqual,
      TValue minValue,
      TValue maxValue
    )
    {
      if(value == null)
        return minValue == null && maxValue == null;

      var result = true;
      result &= minValue == null || isLessThanOrEqual(minValue, value);
      result &= maxValue == null || isLessThanOrEqual(value, maxValue);

      return result;
    }
  }
}