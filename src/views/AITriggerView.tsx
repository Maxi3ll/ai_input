import type { GradientControlValues } from '../types';
import { AITriggerButton } from '../components/AITriggerButton';
import './AITriggerView.css';

interface AITriggerViewProps {
  label: string;
  borderRadius: number;
  stickyPreview: boolean;
  controls: GradientControlValues;
}

const MOCK_ITEMS = [
  { title: 'GLE Coupé', desc: 'Sportiness meets luxury in a design that commands attention on every road.' },
  { title: 'EQS Sedan', desc: 'The pinnacle of electric luxury — silence, power, and effortless range.' },
  { title: 'C-Class Estate', desc: 'Versatile elegance with generous space for every journey.' },
  { title: 'AMG GT', desc: 'Handcrafted performance engine meets aerodynamic precision.' },
  { title: 'GLA Compact SUV', desc: 'Urban agility with the confidence of an SUV stance.' },
  { title: 'S-Class Sedan', desc: 'The benchmark for automotive luxury and innovation since 1972.' },
  { title: 'EQE SUV', desc: 'Spacious electric mobility with a striking presence and generous range.' },
  { title: 'CLE Coupé', desc: 'A bold silhouette that blends sportiness with everyday refinement.' },
  { title: 'G-Class', desc: 'The iconic off-roader — unmistakable design, unstoppable capability.' },
  { title: 'AMG SL', desc: 'Open-top performance legacy reborn with a 2+2 cockpit and AMG DNA.' },
  { title: 'Maybach S-Class', desc: 'The ultimate expression of exclusivity, comfort, and craftsmanship.' },
  { title: 'EQB Compact SUV', desc: 'Seven seats, zero emissions — electric versatility for the family.' },
  { title: 'A-Class Sedan', desc: 'Premium compact design with turbocharged efficiency and MBUX.' },
  { title: 'GLC SUV', desc: 'The versatile midsize SUV that balances comfort and capability.' },
  { title: 'AMG C 63', desc: 'Four-cylinder hybrid fury with Formula 1 technology on the road.' },
  { title: 'EQA', desc: 'The entry to electric Mercedes — compact, connected, and emission-free.' },
  { title: 'GLS SUV', desc: 'Full-size luxury for seven — the S-Class among SUVs.' },
  { title: 'Maybach GLS', desc: 'First-class travel meets commanding road presence and V8 power.' },
  { title: 'AMG GT 4-Door', desc: 'Four doors, no compromise — track-bred performance for every day.' },
  { title: 'E-Class Sedan', desc: 'The intelligent executive sedan with pioneering driver assistance.' },
  { title: 'GLB', desc: 'Compact proportions with the heart and space of a true SUV.' },
  { title: 'CLA Coupé', desc: 'Four-door coupé elegance at an accessible entry point.' },
  { title: 'EQE Sedan', desc: 'Business-class electric — 590 km range meets progressive luxury.' },
  { title: 'AMG ONE', desc: 'Formula 1 hybrid powertrain in a street-legal hypercar. Limited to 275.' },
];

export function AITriggerView({
  label,
  borderRadius,
  stickyPreview,
  controls,
}: AITriggerViewProps) {
  return (
    <>
      <div className="input-stage">
        <div className="ai-trigger-demo">
          <span className="ai-trigger-demo__label">Preview</span>

          <div className="ai-trigger-demo__scroll">
            <div className="ai-trigger-demo__content">
              {MOCK_ITEMS.map((item) => (
                <div key={item.title} className="ai-trigger-card">
                  <div className="ai-trigger-card__img" />
                  <div className="ai-trigger-card__body">
                    <span className="ai-trigger-card__title">{item.title}</span>
                    <span className="ai-trigger-card__desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ai-trigger-demo__sticky">
              <AITriggerButton
                label={label}
                borderRadius={borderRadius}
                controls={controls}
              />
            </div>
          </div>
        </div>
      </div>

      {stickyPreview && (
        <div className="ai-trigger-fixed-preview">
          <AITriggerButton
            label={label}
            borderRadius={borderRadius}
            controls={controls}
          />
        </div>
      )}
    </>
  );
}
