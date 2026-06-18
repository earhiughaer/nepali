import AVFoundation
import Foundation

let input = CommandLine.arguments.dropFirst().first ?? "alphabet/alphabet.mp3"
let url = URL(fileURLWithPath: input)
let file = try AVAudioFile(forReading: url)
let format = file.processingFormat
let sampleRate = format.sampleRate
let totalFrames = AVAudioFrameCount(file.length)
let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: totalFrames)!
try file.read(into: buffer)

let channels = Int(format.channelCount)
let frameLength = Int(buffer.frameLength)
let window = 1024
let hop = 512
var envelope: [(Double, Double)] = []

for start in stride(from: 0, to: frameLength, by: hop) {
    let end = min(start + window, frameLength)
    var sum = 0.0
    var count = 0
    if let data = buffer.floatChannelData {
        for ch in 0..<channels {
            let samples = data[ch]
            for i in start..<end {
                let v = Double(samples[i])
                sum += v * v
                count += 1
            }
        }
    }
    let rms = count > 0 ? sqrt(sum / Double(count)) : 0.0
    envelope.append((Double(start) / sampleRate, rms))
}

let maxRms = envelope.map { $0.1 }.max() ?? 0.0
let threshold = max(maxRms * 0.08, 0.004)
var regions: [(Double, Double)] = []
var inRegion = false
var startTime = 0.0
var lastActive = 0.0

for (time, rms) in envelope {
    if rms >= threshold {
        if !inRegion {
            inRegion = true
            startTime = time
        }
        lastActive = time
    } else if inRegion && time - lastActive > 0.12 {
        regions.append((max(0.0, startTime - 0.04), min(Double(frameLength) / sampleRate, lastActive + 0.10)))
        inRegion = false
    }
}
if inRegion {
    regions.append((max(0.0, startTime - 0.04), min(Double(frameLength) / sampleRate, lastActive + 0.10)))
}

print("sampleRate=\(sampleRate)")
print("duration=\(Double(frameLength) / sampleRate)")
print("maxRms=\(maxRms)")
print("threshold=\(threshold)")
print("regions=\(regions.count)")
for (idx, region) in regions.enumerated() {
    print(String(format: "%02d %.6f %.6f", idx + 1, region.0, region.1))
}
