/* ============================================
   spaKo – Translator JavaScript
   ============================================ */

'use strict';

const TRANSLATIONS = {
  'hello': { si: 'ආයුබෝවන්', fr: 'Bonjour', de: 'Hallo', ja: 'こんにちは', ko: '안녕하세요', zh: '你好', ar: 'مرحبا', es: 'Hola', ta: 'வணக்கம்', pt: 'Olá', ru: 'Привет', it: 'Ciao', hi: 'नमस्ते', th: 'สวัสดี', tr: 'Merhaba', nl: 'Hallo', pl: 'Cześć', sv: 'Hej', uk: 'Привіт', en: 'Hello' },
  'thank you': { si: 'ස්තූතියි', fr: 'Merci', de: 'Danke', ja: 'ありがとう', ko: '감사합니다', zh: '谢谢', ar: 'شكراً', es: 'Gracias', ta: 'நன்றி', pt: 'Obrigado', ru: 'Спасибо', it: 'Grazie', hi: 'धन्यवाद', th: 'ขอบคุณ', tr: 'Teşekkür ederim', nl: 'Dank je', en: 'Thank you' },
  'good morning': { si: 'සුභ උදෑසනක්', fr: 'Bonjour', de: 'Guten Morgen', ja: 'おはようございます', ko: '좋은 아침', zh: '早上好', ar: 'صباح الخير', es: 'Buenos días', ta: 'காலை வணக்கம்', pt: 'Bom dia', ru: 'Доброе утро', it: 'Buongiorno', hi: 'सुप्रभात', en: 'Good Morning' },
  'good night': { si: 'සුභ රාත්‍රියක්', fr: 'Bonne nuit', de: 'Gute Nacht', ja: 'おやすみなさい', ko: '안녕히 주무세요', zh: '晚安', ar: 'تصبح على خير', es: 'Buenas noches', ta: 'இரவு வணக்கம்', pt: 'Boa noite', it: 'Buona notte', en: 'Good Night' },
  'how are you': { si: 'කොහොමද?', fr: 'Comment ça va?', de: 'Wie geht es Ihnen?', ja: 'お元気ですか？', ko: '어떻게 지내요?', zh: '你好吗？', ar: 'كيف حالك؟', es: '¿Cómo estás?', ta: 'நீங்கள் எப்படி இருக்கிறீர்கள்?', pt: 'Como você está?', ru: 'Как дела?', en: 'How are you?' },
  'i love you': { si: 'මම ඔයාට ආදරෙයි', fr: 'Je t\'aime', de: 'Ich liebe dich', ja: '愛してる', ko: '사랑해요', zh: '我爱你', ar: 'أحبك', es: 'Te quiero', ta: 'நான் உன்னை நேசிக்கிறேன்', pt: 'Eu te amo', ru: 'Я тебя люблю', it: 'Ti amo', en: 'I love you' },
  'yes': { si: 'ඔව්', fr: 'Oui', de: 'Ja', ja: 'はい', ko: '네', zh: '是', ar: 'نعم', es: 'Sí', ta: 'ஆம்', pt: 'Sim', ru: 'Да', it: 'Sì', en: 'Yes' },
  'no': { si: 'නෑ', fr: 'Non', de: 'Nein', ja: 'いいえ', ko: '아니요', zh: '不', ar: 'لا', es: 'No', ta: 'இல்லை', pt: 'Não', ru: 'Нет', it: 'No', en: 'No' },
  'please': { si: 'කරුණාකර', fr: 'S\'il vous plaît', de: 'Bitte', ja: 'お願いします', ko: '부탁합니다', zh: '请', ar: 'من فضلك', es: 'Por favor', ta: 'தயவுசெய்து', pt: 'Por favor', ru: 'Пожалуйста', en: 'Please' },
  'excuse me': { si: 'සමාවෙන්න', fr: 'Excusez-moi', de: 'Entschuldigung', ja: 'すみません', ko: '실례합니다', zh: '对不起', ar: 'عفواً', es: 'Disculpe', ta: 'மன்னிக்கவும்', en: 'Excuse me' },
  'language learning': { si: 'භාෂා ඉගෙනීම', fr: 'Apprentissage des langues', de: 'Sprachenlernen', ja: '言語学習', ko: '언어 학습', zh: '语言学习', ar: 'تعلم اللغة', es: 'Aprendizaje de idiomas', en: 'Language Learning' },
};

let history = JSON.parse(localStorage.getItem('spako_tr_history') || '[]');

function getTranslation(text, targetLang) {
  const clean = text.trim().toLowerCase();
  if (TRANSLATIONS[clean] && TRANSLATIONS[clean][targetLang]) {
    return TRANSLATIONS[clean][targetLang];
  }
  // Simple demo fallback
  const langNames = { si: 'Sinhala', fr: 'French', de: 'German', ja: 'Japanese', ko: 'Korean', zh: 'Chinese', ar: 'Arabic', es: 'Spanish', ta: 'Tamil', pt: 'Portuguese', ru: 'Russian', it: 'Italian', hi: 'Hindi', th: 'Thai', tr: 'Turkish', nl: 'Dutch', pl: 'Polish', sv: 'Swedish', uk: 'Ukrainian', en: 'English' };
  return `[${langNames[targetLang] || targetLang} translation] ${text}\n\n(Connect a real translation API for production)`;
}

function setTarget(lang) {
  const sel = document.getElementById('tr-target-lang');
  if (sel) sel.value = lang;
  window.spaKo.ToastManager.show(`Target set to ${lang.toUpperCase()}`, 'info');
}

document.addEventListener('DOMContentLoaded', () => {
  const sourceText = document.getElementById('tr-source-text');
  const outputText = document.getElementById('tr-output-text');
  const translateBtn = document.getElementById('tr-translate-btn');
  const swapBtn = document.getElementById('tr-swap-btn');
  const charCount = document.getElementById('tr-char-count');
  const voiceBtn = document.getElementById('tr-voice-btn');
  const clearBtn = document.getElementById('tr-clear-btn');
  const copyBtn = document.getElementById('tr-copy-btn');
  const downloadBtn = document.getElementById('tr-download-btn');
  const listenSrcBtn = document.getElementById('tr-listen-source-btn');
  const listenOutBtn = document.getElementById('tr-listen-output-btn');
  const shareBtn = document.getElementById('tr-share-btn');
  const historyList = document.getElementById('history-list');

  // Char count
  if (sourceText) {
    sourceText.addEventListener('input', () => {
      if (charCount) charCount.textContent = sourceText.value.length;
    });
  }

  // Translate
  if (translateBtn) {
    translateBtn.addEventListener('click', () => {
      const text = sourceText.value.trim();
      if (!text) { window.spaKo.ToastManager.show('Please enter text to translate', 'error'); return; }
      const target = document.getElementById('tr-target-lang').value;
      translateBtn.textContent = 'Translating...';
      translateBtn.disabled = true;

      setTimeout(() => {
        const result = getTranslation(text, target);
        outputText.value = result;
        translateBtn.textContent = 'Translate ✨';
        translateBtn.disabled = false;
        window.spaKo.ToastManager.show('Translation complete!', 'success');

        // Save to history
        const source = document.getElementById('tr-source-lang').value;
        addHistory(text, result, source, target);
      }, 800);
    });
  }

  // Swap
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const src = document.getElementById('tr-source-lang');
      const tgt = document.getElementById('tr-target-lang');
      [src.value, tgt.value] = [tgt.value, src.value];
      const temp = sourceText.value;
      sourceText.value = outputText.value;
      outputText.value = temp;
      if (charCount) charCount.textContent = sourceText.value.length;
    });
  }

  // Clear
  if (clearBtn) clearBtn.addEventListener('click', () => { sourceText.value = ''; outputText.value = ''; if (charCount) charCount.textContent = '0'; });

  // Copy
  if (copyBtn) copyBtn.addEventListener('click', () => {
    if (outputText.value) window.spaKo.copyToClipboard(outputText.value);
    else window.spaKo.ToastManager.show('Nothing to copy', 'error');
  });

  // Download
  if (downloadBtn) downloadBtn.addEventListener('click', () => {
    const text = outputText.value;
    if (!text) { window.spaKo.ToastManager.show('No translation to download', 'error'); return; }
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'spako_translation.txt';
    a.click();
  });

  // Share
  if (shareBtn) shareBtn.addEventListener('click', () => {
    if (navigator.share && outputText.value) {
      navigator.share({ title: 'spaKo Translation', text: outputText.value });
    } else {
      window.spaKo.copyToClipboard(outputText.value);
      window.spaKo.ToastManager.show('Translation copied for sharing!', 'success');
    }
  });

  // Voice input
  if (voiceBtn) voiceBtn.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SR();
      rec.onresult = e => {
        sourceText.value = e.results[0][0].transcript;
        if (charCount) charCount.textContent = sourceText.value.length;
        window.spaKo.ToastManager.show('Voice captured!', 'success');
      };
      rec.onerror = () => window.spaKo.ToastManager.show('Voice recognition failed', 'error');
      rec.start();
      window.spaKo.ToastManager.show('Listening... speak now', 'info');
    } else {
      window.spaKo.ToastManager.show('Voice not supported in this browser', 'error');
    }
  });

  // TTS
  function speak(text) {
    if (!text) { window.spaKo.ToastManager.show('Nothing to read', 'error'); return; }
    if ('speechSynthesis' in window) {
      const utt = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utt);
    } else {
      window.spaKo.ToastManager.show('Text-to-speech not supported', 'error');
    }
  }

  if (listenSrcBtn) listenSrcBtn.addEventListener('click', () => speak(sourceText.value));
  if (listenOutBtn) listenOutBtn.addEventListener('click', () => speak(outputText.value));

  // History
  function addHistory(src, tgt, srcLang, tgtLang) {
    const lang_labels = { si: 'Sinhala', fr: 'French', de: 'German', ja: 'Japanese', ko: 'Korean', zh: 'Chinese', ar: 'Arabic', es: 'Spanish', ta: 'Tamil', en: 'English', auto: 'Auto' };
    const item = {
      source: src, target: tgt,
      srcLang: lang_labels[srcLang] || srcLang,
      tgtLang: lang_labels[tgtLang] || tgtLang,
      time: 'Just now'
    };
    history.unshift(item);
    history = history.slice(0, 10);
    localStorage.setItem('spako_tr_history', JSON.stringify(history));
    renderHistory();
  }

  function renderHistory() {
    if (!historyList) return;
    if (history.length === 0) {
      historyList.innerHTML = '<p style="color: var(--light-text); text-align: center; padding: 20px;">No translations yet</p>';
      return;
    }
    historyList.innerHTML = history.map(h => `
      <div class="history-item" onclick="loadHistory(this)" data-src="${encodeURIComponent(h.source)}" data-tgt="${encodeURIComponent(h.target)}">
        <div style="flex: 1;">
          <div class="hist-langs">${h.srcLang} → ${h.tgtLang}</div>
          <div class="hist-source">"${h.source.substring(0, 60)}${h.source.length > 60 ? '...' : ''}"</div>
          <div class="hist-target">${h.target.substring(0, 60)}${h.target.length > 60 ? '...' : ''}</div>
        </div>
        <div class="hist-time">${h.time}</div>
      </div>
    `).join('');
  }

  renderHistory();

  // Quick lang tabs
  document.querySelectorAll('.tr-lang-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tr-lang-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const lang = tab.dataset.lang;
      const srcSel = document.getElementById('tr-source-lang');
      if (srcSel) srcSel.value = lang;
    });
  });
});

function loadHistory(el) {
  const src = decodeURIComponent(el.dataset.src);
  const tgt = decodeURIComponent(el.dataset.tgt);
  document.getElementById('tr-source-text').value = src;
  document.getElementById('tr-output-text').value = tgt;
}
