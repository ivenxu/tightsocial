/*
 * The MIT License
 *
 * Copyright 2015 tightsocial.org.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package org.tightsocial.feedbackgleaning.application;

import java.io.Serializable;
import javax.enterprise.context.ApplicationScoped;
import org.tightsocial.feedbackgleaning.model.FormRepository;
import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;
import org.tightsocial.feedbackgleaning.model.Form;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
@Named
@ApplicationScoped
public class ApplicationService implements Serializable{
    private static final long serialVersionUID = -3452993334360474159L;
    
    public ApplicationService(){
    }
    
    @Inject
    private FormRepository formRepository;
    
    @Transactional
    public void xyz(){
        
        Form f = new Form("hello");
        formRepository.save(f);
        f=formRepository.ofId(1l);
        f.changeDescription("hello world");
    }
}
