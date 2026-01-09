import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePDFGenerator } from '@/composables/usePDFGenerator';
import type Password from '@/interfaces/password';

// Mock dependencies
const mockDrawText = vi.fn();
const mockDrawImage = vi.fn();
const mockAddPage = vi.fn(() => ({
    getSize: () => ({ height: 800, width: 600 }),
    drawText: mockDrawText,
    drawImage: mockDrawImage
}));
const mockEmbedFont = vi.fn();
const mockEmbedPng = vi.fn(() => ({
    scale: () => ({ width: 100, height: 100 })
}));
const mockSave = vi.fn(() => new Uint8Array([1, 2, 3]));

vi.mock('pdf-lib', () => ({
    PDFDocument: {
        create: vi.fn(() => ({
            setProducer: vi.fn(),
            embedFont: mockEmbedFont,
            addPage: mockAddPage,
            embedPng: mockEmbedPng,
            save: mockSave
        }))
    },
    StandardFonts: {
        TimesRoman: 'TimesRoman',
        CourierOblique: 'CourierOblique'
    },
    rgb: vi.fn()
}));

vi.mock('downloadjs', () => {
    return {
        default: vi.fn()
    };
});

// Mock Global Fetch for the image
global.fetch = vi.fn(() =>
    Promise.resolve({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
    })
) as any;


describe('usePDFGenerator', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('generates a PDF and triggers download', async () => {
        const { generatePDF } = usePDFGenerator();
        const mockPasswords: Password[] = [
            { context: 'Google', hash: '123456', date: '2023-01-01' },
            { context: 'Facebook', hash: 'abcdef', date: '2023-01-02' }
        ];

        await generatePDF('TestUser', mockPasswords);

        // Check if PDF document was created and helper methods called
        expect(mockEmbedFont).toHaveBeenCalledTimes(2); // Times & Courier
        expect(mockAddPage).toHaveBeenCalled();

        // Assertions for drawing text (Title, User, and Passwords)
        // Title + User + 2 passwords = 4 calls minimum
        expect(mockDrawText).toHaveBeenCalled();

        // Check if Passwords were drawn
        expect(mockDrawText).toHaveBeenCalledWith(
            expect.stringContaining('Google || 123456'),
            expect.any(Object)
        );

        // Check save
        expect(mockSave).toHaveBeenCalled();

        // Check download
        const download = await import('downloadjs');
        expect(download.default).toHaveBeenCalled();
    });

    it('handles image fetch error gracefully', async () => {
        // Mock fetch failure
        global.fetch = vi.fn(() => Promise.reject('Network error')) as any;

        const { generatePDF } = usePDFGenerator();
        await generatePDF('TestUser', []);

        // Should still generate PDF just without image
        expect(mockAddPage).toHaveBeenCalled();
        expect(mockSave).toHaveBeenCalled();
    });
});
