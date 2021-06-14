const {
  fetchMessageFromShan,
  getDecryptedLetter,
  decryptMessage,
  checkSupport,
  checkIfShanHasSupport,
} = require("../utils");

describe("Tame of Thrones", () => {
  describe("fetchMessageFromShan", () => {
    test("Expect to retun messages", () => {
      const messages = fetchMessageFromShan("__tests__/example.txt");
      expect(messages.length).toEqual(3);
    });
  });

  describe("getDecryptedLetter", () => {
    test("Expect decrypeted letter to match", () => {
      const decryptedLetter = getDecryptedLetter(3, "D");
      expect(decryptedLetter).toEqual("A");
    });
  });

  describe("decryptMessage", () => {
    test("Expect decrypeted message to match", () => {
      const decryptedMessage = decryptMessage("AIR", "ROZO");
      expect(decryptedMessage).toEqual("OLWL");
    });
  });

  describe("checkSupport", () => {
    test("Expect decrypeted message to match with kingdom's emblem", () => {
      const hasSupport = checkSupport("AIR", "OLWL");
      expect(hasSupport).toBe(true);
    });

    test("Expect decrypeted message to not match with kingdom's emblem", () => {
      const hasSupport = checkSupport("AIR", "OAWA");
      expect(hasSupport).toBe(false);
    });
  });

  describe("checkIfShanHasSupport", () => {
    test("Expect Shan to have support and return kingdom type", () => {
      const result = checkIfShanHasSupport("AIR ROZO");
      expect(result).toEqual("AIR");
    });

    test("Expect Shan to not have support and return null", () => {
      const hasSupport = checkIfShanHasSupport("AIR OWLAOWLBOWLC");
      expect(hasSupport).toEqual(null);
    });
  });
});
