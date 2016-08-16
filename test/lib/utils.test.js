const assert = require("assert");

const Util = require("../../src/lib/util");

describe("Util", function() {
  describe("isAngleContained", function() {
    it("true with min, target and max of 0, 45, 90", function() {
      assert.equal(Util.isAngleContained(0, 45, 90), true);
    });

    it("true with min, target and max of 359, 45, 89", function() {
      assert.equal(Util.isAngleContained(359, 45, 89), true);
    });

    it("true with min, target and max of 270, 359, 0", function() {
      assert.equal(Util.isAngleContained(270, 359, 0), true);
    });

    it("true with min, target and max of 270, 0, 90", function() {
      assert.equal(Util.isAngleContained(270, 0, 90), true);
    });

    it("true with min, target and max of 359, 45, 89", function() {
      assert.equal(Util.isAngleContained(359, 45, 89), true);
    });

    it("true with min, target and max of 180, 180, 270", function() {
      assert.equal(Util.isAngleContained(180, 180, 280), true);
    });

    it("true with min, target and max of 180, 270, 270", function() {
      assert.equal(Util.isAngleContained(180, 180, 280), true);
    });

    it("true with min, target and max of 255, 256, 345", function() {
      assert.equal(Util.isAngleContained(255, 256, 345), true);
    });

    it("false with min, target and max of 255, 254, 345", function() {
      assert.equal(Util.isAngleContained(255, 254, 345), false);
    });

    it("false with min, target and max of 359, 90, 89", function() {
      assert.equal(Util.isAngleContained(359, 90, 89), false);
    });

    it("false with min, target and max of 10, 101, 100", function() {
      assert.equal(Util.isAngleContained(10, 101, 100), false);
    });
  });
});
