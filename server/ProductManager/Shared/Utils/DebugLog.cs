using System;
using System.Collections.Generic;

namespace ProductManager.Shared.Utils 
{
  public static class DebugLog {
    public static void LogList<T>(List<T> list) {
      list.ForEach(i => Console.Write(i.ToString() + " "));
      Console.WriteLine();
    }
  }
}