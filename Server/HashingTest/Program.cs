using HashingTest;

Hashing h = new();

string?[] s = h.Hasher("test");

Console.WriteLine(s[0]);
Console.WriteLine(s[1]);