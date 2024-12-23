import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmailService {
  async sendEmailToGoogleScript(email: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbywlWE_7gAa2Vw-Pyt1-2jQ9RImiEwPNGrjuYABHn2xBmvxlcE0pzWyJ7oetvvdm-c_/exec',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw new HttpException(
        'Failed to send email to Google Script',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
