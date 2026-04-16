import SectionLayout from "@/components/sections/section-layout";
import ComparisonAudioPlayer from "@/components/audio-player/comparison-audio-player";
import { PROJECT_DATA } from "@/lib/constants";

export default function AudioQualityAssessmentPage() {
  const [audio1, audio2, audio3] = PROJECT_DATA.audioSignals;

  return (
    <SectionLayout
      title="Quality Assessment"
      subtitle="Subjective listening evaluation results"
    >
      <div className="space-y-12 prose prose-invert max-w-none">
        <section>
          <h2 id="hiss-removal-assessment" className="font-google-sans font-bold">I. Audio 1: Hiss Removal Assessment</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            The filtered version demonstrates substantial reduction in high-frequency hiss. The background noise floor appears lower, resulting in improved clarity and definition of the audio content.
          </p>
          <div className="not-prose mt-8">
            <ComparisonAudioPlayer
              signalName={audio1.name}
              originalSrc={`/audio/Noisy/wav/${audio1.file}`}
              filteredSrc={`/audio/Filtered/filtered_${audio1.file.replace('.wav', '_LPF.wav')}`}
              noiseType={audio1.noiseType}
              filterType={audio1.filterType}
              mse={audio1.metrics.mse}
              snrImprovement={audio1.metrics.snrSignalNoise.improvement}
            />
          </div>
        </section>

        <section>
          <h2 id="tonal-interference-assessment" className="font-google-sans font-bold">II. Audio 2: Tonal Interference Assessment</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            Shows partial effectiveness. While some attenuation of the low-frequency drone or fan is perceptible, the tonal component remains audible in the filtered output.
          </p>
          <div className="not-prose mt-8">
            <ComparisonAudioPlayer
              signalName={audio2.name}
              originalSrc={`/audio/Noisy/wav/${audio2.file}`}
              filteredSrc={`/audio/Filtered/filtered_${audio2.file.replace('.wav', '_BSF.wav')}`}
              noiseType={audio2.noiseType}
              filterType={audio2.filterType}
              mse={audio2.metrics.mse}
              snrImprovement={audio2.metrics.snrSignalNoise.improvement}
            />
          </div>
        </section>

        <section>
          <h2 id="rumble-removal-assessment" className="font-google-sans font-bold">III. Audio 3: Rumble Removal Assessment</h2>
          <p className="local-inter text-muted-foreground leading-relaxed">
            Significant improvement in audio clarity through effective removal of low-frequency rumble. The muddy quality has been eliminated, resulting in cleaner and more defined audio.
          </p>
          <div className="not-prose mt-8">
            <ComparisonAudioPlayer
              signalName={audio3.name}
              originalSrc={`/audio/Noisy/wav/${audio3.file}`}
              filteredSrc={`/audio/Filtered/filtered_${audio3.file.replace('.wav', '_HPF.wav')}`}
              noiseType={audio3.noiseType}
              filterType={audio3.filterType}
              mse={audio3.metrics.mse}
              snrImprovement={audio3.metrics.snrSignalNoise.improvement}
            />
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
